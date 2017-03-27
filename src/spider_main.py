#coding:utf-8

import html_downloader
import html_outputer
import html_parser
import url_manager

class SpiderMain(object):

    def __init__(self):
        self.url_mgr = url_manager.UrlManager()
        self.downloader = html_downloader.HtmlDownloader()
        self.parser = html_parser.HtmlParser()
        self.outputer = html_outputer.HtmlOutputer()
    
    def craw(self, root_url):
        self.url_mgr.add_new_url(root_url)
        count = 1

        while self.url_mgr.has_new_url():
            url = self.url_mgr.get_new_url()
            print 'craw %d, url: %s' % (count, url)
            count = count + 1

            html_content = self.downloader.download(url)
            print html_content
            new_urls, new_data = self.parser.parse(html_content)
            self.url_mgr.add_new_urls(new_urls)
            self.outputer.add_new_data(new_data)
        
        self.outputer.output()
            
if __name__ == '__main__':
    root_url = r''
    spider = SpiderMain()
    spider.craw(root_url)