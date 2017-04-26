#coding:utf-8

"""
comic spider
"""

import json
import os
import re
import time
from urllib import request
from urllib import error
from bs4 import BeautifulSoup
from lzstring import LZString

def crawl_chapter_list(url):
    """crawl chapter list"""

    html = None

    req = request.Request(url)
    req.add_header('User-Agent', 'Mozilla/6.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/8.0 Mobile/10A5376e Safari/8536.25')
    with request.urlopen(req) as response:
        if response.status != 200:
            print("download failed! status = %s, reason = %s" % (response.status, response.reason))
            return
        html = response.read()

    soup = BeautifulSoup(html, 'html.parser')
    node = soup.find('div', class_=re.compile(r'^main-bar.*')).find("h1")
    if node is None:
        print("get title node failed!")
        return
    
    title = node.get_text()
    print(title)

    node = soup.find('div', class_="chapter-list")
    if node is None:
        print("get chapter list node failed!")
        return

    href_nodes = node.find_all('a')
    if href_nodes is None:
        print("get href nodes failed!")
        return
    
    chapter_info_list = list()
    for node in href_nodes:
        chapter_info = dict()
        chapter_info["url"] = "http://m.ikanman.com" + node.get("href")
        chapter_info["title"] = node.find("b").get_text()
        chapter_info_list.append(chapter_info)
    
    return chapter_info_list
        

def crawl_chapter(chapter_info):
    """crawl chapter"""

    print("crawl_chapter %s" % chapter_info["title"])

    html = None

    url = chapter_info["url"]
    title = chapter_info["title"]

    # download html
    req = request.Request(url)
    req.add_header('User-Agent', 'Mozilla/6.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/8.0 Mobile/10A5376e Safari/8536.25')
    with request.urlopen(req) as response:
        if response.status != 200:
            print("download failed! status = %s, reason = %s" % (response.status, response.reason))
            return

        html = response.read()

    # get script node
    soup = BeautifulSoup(html, 'html.parser')
    node = soup.find('script', text=re.compile(r'^window'))
    if node is None:
        print("get script node failed!")
        return

    script = node.get_text()
    if script is None:
        print("get script text failed!")
        return

    # get dict_json and compress_str
    match_result = re.match(r'.*({".*"}).*\'([0-9a-zA-Z/\+=]+)\'.*', script)
    if match_result is None:
        print("re.match failed! script = %s" % script)
        return

    dict_json = match_result.group(1)
    compress_str = match_result.group(2)

    # decompress compress_str
    lzstring = LZString()
    array_str = lzstring.decompresFromBase64(compress_str)
    if array_str is None:
        print("lzstring.decompressFromBase64 failed! compress_str = %s" % compress_str)
        return

    # split array_str to array
    comic_info_arr = array_str.split('|')
    if comic_info_arr is None or len(comic_info_arr) == 0:
        print("split array_str failed! array_str = %s" % array_str)
        return

    # build comic_info_dict
    comic_info_dict = {}
    index_to_key_map = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    def index_to_key(index):
        """index_to_key"""

        key = ""

        if index == 0:
            return "0"

        while index > 0:
            key = index_to_key_map[index % 62] + key
            index = int(index / 62)
        return key

    for index in range(0, len(comic_info_arr)):
        key = index_to_key(index)
        if comic_info_arr[index] != "":
            comic_info_dict[key] = comic_info_arr[index]
        else:
            comic_info_dict[key] = key

    # replace dict_json
    def replace(match):
        """replace"""
        return comic_info_dict[match.group(0)]

    comic_info_json = re.sub(r'\b\w+\b', replace, dict_json)
    if comic_info_json is None:
        print("re.sub failed! dict_json = %s" % dict_json)
        return

    # parse json to comic_info
    comic_info = json.loads(comic_info_json)
    if comic_info is None:
        print("json.loads failed! comic_info_json = %s" % comic_info_json)
        return

    if comic_info["images"] is None or len(comic_info["images"]) == 0:
        print("comic_info.images is None or empty! comic_info.images = %s" % str(comic_info.images))
        return

    # add host
    comic_images = comic_info["images"]
    for i in range(0, len(comic_images)):
        comic_images[i] = "http://i.hamreus.com:8080" + comic_images[i]

    print("image count = %s" % len(comic_images))

    # download image
    image_dir = "./images/" + title
    if not os.path.exists(image_dir):
        os.makedirs(image_dir)

    index = 0
    while index < len(comic_images):
        image_url = comic_images[index]
        image_name = image_url.split('/')[-1]
        image_path = image_dir + "/" + image_name

        if os.path.exists(image_path):
            index += 1
            continue

        req = request.Request(image_url)
        req.add_header("Accept", "image/webp,image/*,*/*;q=0.8")
        req.add_header("Referer", url)
        req.add_header("Connection", "keep-alive")
        req.add_header('User-Agent', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36')

        try:
            image_data = request.urlopen(req).read()
        except error.HTTPError as err:
            if err.code == 522:
                print("%d, %s timeout" % (index, image_name))
                time.sleep(5)
                continue
            else:
                raise err
        else:
            with open(image_path, "wb") as image_file:
                image_file.write(image_data)
            index += 1

def main():
    """main"""
    print("main enter")

    url = "http://m.ikanman.com/comic/5388"

    chapter_list = crawl_chapter_list(url)

    for chapter_info in chapter_list:
        crawl_chapter(chapter_info)

    print("main exit")

if __name__ == '__main__':
    main()
