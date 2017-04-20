#coding:utf-8

"""
test.py
"""

import os
import re
from PIL import Image

def main():
    """main"""

    comic_dir = "./images/姑获鸟之夏第四卷"

    if not os.path.exists(comic_dir):
        print("dir not exists")
        return
    
    index = 0
    for file_name in os.listdir(comic_dir):

        match_result = re.match(r'^(.*)\.(jpg|png).webp$', file_name)
        if match_result is None:
            continue
        
        comic_name = match_result.group(1)

        old_path = comic_dir + "/" + file_name
        new_path = comic_dir + "/" + comic_name + '.jpg'

        image = Image.open(old_path)
        image.save(new_path, 'jpeg')

        os.remove(old_path)

        index += 1
        print("%d, %s" % (index, comic_name))

    print("main exit")

main()
