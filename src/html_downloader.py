#coding:utf-8
import urllib2


class HtmlDownloader(object):
    
    def download(self, url):
        headers = {
            'Host':'',
            'User-Agent':'Mozilla/5.0 (Windows NT 6.2; rv:16.0) Gecko/20100101 Firefox/16.0',
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Connection':'keep-alive'
        }
        request = urllib2.Request(url, headers=headers)
        response = urllib2.urlopen(request)
        if response.getcode() != 200:
            return
        return response.read()
    
    



