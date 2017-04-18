#coding:utf-8

"""
test.py
"""

import json
import os
import re
from urllib import request
from lzstring import LZString

def main():
    """main"""

    dict_json = '{"B":D,"C":"u","t":v,"x":"w-K","J":L,"N":0,"M":["/7/y/2/4-3/F.6.5","/7/y/2/4-3/E.6.5","/7/y/2/4-3/G.6.5","/7/y/2/4-3/I.6.5","/7/y/2/4-3/H.6.5","/7/y/2/4-3/s.6.5","/7/y/2/4-3/g.6.5","/7/y/2/4-3/d.6.5","/7/y/2/4-3/c.6.5","/7/y/2/4-3/b.6.5","/7/y/2/4-3/e.6.5","/7/y/2/4-3/h.6.5","/7/y/2/4-3/f.6.5","/7/y/2/4-3/8.6.5","/7/y/2/4-3/9.6.5","/7/y/2/4-3/a.6.5","/7/y/2/4-3/o.6.5","/7/y/2/4-3/n.6.5","/7/y/2/4-3/p.6.5","/7/y/2/4-3/r.6.5","/7/y/2/4-3/q.6.5","/7/y/2/4-3/j.6.5","/7/y/2/4-3/i.6.5","/7/y/2/4-3/k.6.5","/7/y/2/4-3/m.6.5","/7/y/2/4-3/l.6.5","/7/y/2/4-3/1e.6.5","/7/y/2/4-3/1d.6.5","/7/y/2/4-3/1f.6.5","/7/y/2/4-3/1h.6.5","/7/y/2/4-3/1g.6.5","/7/y/2/4-3/19.6.5","/7/y/2/4-3/18.6.5","/7/y/2/4-3/1a.6.5","/7/y/2/4-3/1c.6.5","/7/y/2/4-3/1b.6.5","/7/y/2/4-3/1q.6.5","/7/y/2/4-3/1o.6.5","/7/y/2/4-3/1p.6.5","/7/y/2/4-3/1n.6.5","/7/y/2/4-3/1j.6.5","/7/y/2/4-3/1i.6.5","/7/y/2/4-3/1k.6.5","/7/y/2/4-3/1m.6.5","/7/y/2/4-3/1l.6.5","/7/y/2/4-3/17.6.5","/7/y/2/4-3/U.6.5","/7/y/2/4-3/T.6.5","/7/y/2/4-3/W.6.5","/7/y/2/4-3/V.6.5","/7/y/2/4-3/S.6.5","/7/y/2/4-3/P.6.5","/7/y/2/4-3/O.6.5","/7/y/2/4-3/R.6.5","/7/y/2/4-3/Q.6.5","/7/y/2/4-3/X.6.5","/7/y/2/4-3/14.6.5","/7/y/2/4-3/13.6.5","/7/y/2/4-3/16.6.5","/7/y/2/4-3/15.6.5"],"12":Z,"Y":1,"11":""}'
    compress_str = 'D7CeEsEcFcEMDsDGALWB7ATgU3sATAMxgBGeADMAO5bEAOwAVrQObC0DOewZAjAbwBZuPAbwCswsbwBs3MgE5eFMmQAcK+XIDsK1cJU8ew8nznSVW4T15cyecoW55r9p/zxC7UvLLui8Erw6PHoyQcLqPJp2Ks7CiuRyUmSyKLC0AC5YGACSACbAgABygM9GgKGxgF1ygPnKgDrygBJOwPJaqiLAgDTeiWmZ2QAq4BkANlgg2LB52cAAygCyABLAxGhoANb584tLAHKwALZD8tIElgaxciq8cuRkRCqiZIFXN8DwWAAeGauEgLvRDU08EuDbWDMLDsNjYABuqzu5DE1zE1jEtjEojEgVhd08yXh3AEOgEoQE5lxOMUUhx6gE0VRd1k7AysAy0FB5jBWBy8D6836aEQSwA+ohEMBEGhoPAMtwxDoxKExOYpZLFCy7uoxNEBFJCdwCOQCNcCNYddr+ARPAQpARfKaroE8Do8KEfHYjg67NF+FcjG6HjjrAJbLcBF7/WQBNcBKINTj+BHtYpRNqdARQsmru7zIcgA=='

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
            print("download success! image_name = %s" % image_name)

    print("main exit")

main()
