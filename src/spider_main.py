#coding:utf-8
import re
import urllib2
from bs4 import BeautifulSoup


def main():
    url = 'http://m.ikanman.com/comic/9637/97814.html'

    # 下载目标网页
    response = urllib2.urlopen(url)
    html = response.read()

    # 获取网页中的特殊脚本
    soup = BeautifulSoup(html, 'html.parser')
    script = soup.find('script', text=re.compile(r'^window')).get_text()

    # 获取脚本中的两个特殊值 .*({".*"})
    result = re.match(r'.*({".*"}).*\'([0-9a-zA-Z/\+=]+)\'.*', script)

    # {"B":D,"C":"u","t":v,"x":"w-K","J":L,"N":0,"M":["/7/y/2/4-3/F.6.5","/7/y/2/4-3/E.6.5","/7/y/2/4-3/G.6.5","/7/y/2/4-3/I.6.5","/7/y/2/4-3/H.6.5","/7/y/2/4-3/s.6.5","/7/y/2/4-3/g.6.5","/7/y/2/4-3/d.6.5","/7/y/2/4-3/c.6.5","/7/y/2/4-3/b.6.5","/7/y/2/4-3/e.6.5","/7/y/2/4-3/h.6.5","/7/y/2/4-3/f.6.5","/7/y/2/4-3/8.6.5","/7/y/2/4-3/9.6.5","/7/y/2/4-3/a.6.5","/7/y/2/4-3/o.6.5","/7/y/2/4-3/n.6.5","/7/y/2/4-3/p.6.5","/7/y/2/4-3/r.6.5","/7/y/2/4-3/q.6.5","/7/y/2/4-3/j.6.5","/7/y/2/4-3/i.6.5","/7/y/2/4-3/k.6.5","/7/y/2/4-3/m.6.5","/7/y/2/4-3/l.6.5","/7/y/2/4-3/1e.6.5","/7/y/2/4-3/1d.6.5","/7/y/2/4-3/1f.6.5","/7/y/2/4-3/1h.6.5","/7/y/2/4-3/1g.6.5","/7/y/2/4-3/19.6.5","/7/y/2/4-3/18.6.5","/7/y/2/4-3/1a.6.5","/7/y/2/4-3/1c.6.5","/7/y/2/4-3/1b.6.5","/7/y/2/4-3/1q.6.5","/7/y/2/4-3/1o.6.5","/7/y/2/4-3/1p.6.5","/7/y/2/4-3/1n.6.5","/7/y/2/4-3/1j.6.5","/7/y/2/4-3/1i.6.5","/7/y/2/4-3/1k.6.5","/7/y/2/4-3/1m.6.5","/7/y/2/4-3/1l.6.5","/7/y/2/4-3/17.6.5","/7/y/2/4-3/U.6.5","/7/y/2/4-3/T.6.5","/7/y/2/4-3/W.6.5","/7/y/2/4-3/V.6.5","/7/y/2/4-3/S.6.5","/7/y/2/4-3/P.6.5","/7/y/2/4-3/O.6.5","/7/y/2/4-3/R.6.5","/7/y/2/4-3/Q.6.5","/7/y/2/4-3/X.6.5","/7/y/2/4-3/14.6.5","/7/y/2/4-3/13.6.5","/7/y/2/4-3/16.6.5","/7/y/2/4-3/15.6.5"],"12":Z,"Y":1,"11":""}
    dic_json = result.group(1)

    # D7CeEsEcFcEMDsDGALWB7ATgU3sATAMxgBGeADMAO5bEAOwAVrQObC0DOewZAjAbwBZuPAbwCswsbwBs3MgE5eFMmQAcK+XIDsK1cJU8ew8nznSVW4T15cyecoW55r9p/zxC7UvLLui8Erw6PHoyQcLqPJp2Ks7CiuRyUmSyKLC0AC5YGACSACbAgABygM9GgKGxgF1ygPnKgDrygBJOwPJaqiLAgDTeiWmZ2QAq4BkANlgg2LB52cAAygCyABLAxGhoANb584tLAHKwALZD8tIElgaxciq8cuRkRCqiZIFXN8DwWAAeGauEgLvRDU08EuDbWDMLDsNjYABuqzu5DE1zE1jEtjEojEgVhd08yXh3AEOgEoQE5lxOMUUhx6gE0VRd1k7AysAy0FB5jBWBy8D6836aEQSwA+ohEMBEGhoPAMtwxDoxKExOYpZLFCy7uoxNEBFJCdwCOQCNcCNYddr+ARPAQpARfKaroE8Do8KEfHYjg67NF+FcjG6HjjrAJbLcBF7/WQBNcBKINTj+BHtYpRNqdARQsmru7zIcgA==
    arr_str = result.group(2)

    # 使用 LZString 算法解压 arr_str

    # 使用算法处理 arr_str

    # 使用正则表达式替换 dic_json

if __name__ == '__main__':
    main()