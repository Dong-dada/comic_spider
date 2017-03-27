#coding:utf-8
from bs4 import BeautifulSoup
import re

class HtmlParser(object):
    
    def parse(self, html_content):
        soup = BeautifulSoup(html_content, 'html.parser')
        imgs = soup.find_all('img', class_=re.compile(r'^alignnone size.*'))
        for img in imgs:
            src = img.get('src')
            print src
    
    



