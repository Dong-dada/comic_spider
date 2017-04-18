#coding:utf-8

"""
comic spider
"""

import json
import os
import re
from urllib import request
from bs4 import BeautifulSoup
from lzstring import LZString

def main():
    """main"""

    url = 'http://m.ikanman.com/comic/9637/97814.html'
    html = None

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

    print("prepare download image count = %s", len(comic_images))

    # download image
    image_dir = "./images"
    if not os.path.exists(image_dir):
        os.mkdir(image_dir)
    for image_url in comic_images:
        image_name = image_url.split('/')[-1]
        image_path = image_dir + "/" + image_name
        req = request.Request(image_url)
        req.add_header("Accept", "image/webp,image/*,*/*;q=0.8")
        req.add_header("Referer", "http://m.ikanman.com/comic/9637/97814.html")
        req.add_header("Connection", "keep-alive")
        req.add_header('User-Agent', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36')
        image_data = request.urlopen(req).read()
        with open(image_path, "wb") as image_file:
            image_file.write(image_data)
            print("download success! image_name = %s, image_data size = %d" % (image_name, len(image_data)))

    print("main exit")


if __name__ == '__main__':
    main()
