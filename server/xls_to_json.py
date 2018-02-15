"""XLS -> json converter
Adapted from source: https://gist.github.com/yosemitebandit/47ab89fe16939c4a7e1e
first:
  $ pip install xlrd

then:
  $ cat in.xls
date, temp, pressure
Jan 1, 73, 455
Jan 3, 72, 344
Jan 7, 52, 100

convert:
  $ python xls_to_json.py in.xls Sheet1 label.json content.json

finally:
  $ cat out.json

Need to auto-format the output in an editor
{
  'data': [
    {'date': 'Jan 1', 'temp': 73, 'pressure': 455},
    {'date': 'Jan 3', 'temp': 72, 'pressure': 344},
    {'date': 'Jan 7', 'temp': 52, 'pressure': 100},
  ]
}
"""
import json
import sys
import xlrd

workbook = xlrd.open_workbook(sys.argv[1])
worksheet = workbook.sheet_by_name(sys.argv[2])

label_data = {}
label_keys = ['keyword', 'url_ids']
KEYWORD_INDEX = 0
URL_INDEX = 1
for row_num in range(1, worksheet.nrows):
    for col_num, cell in enumerate(worksheet.row(row_num)):
        if col_num != KEYWORD_INDEX:
            continue
        keywords = cell.value.strip().replace(',', ' ').split()
        for label in keywords:
            row_data = {}
            label = "".join(ch for ch in label if ch.isalnum()).lower()
            if label == '':
                continue
            if label not in label_data:
                row_data[label_keys[col_num]] = label
                row_data[label_keys[URL_INDEX]] = [row_num - 1]
                label_data[label] = row_data
            elif row_num - 1 not in label_data[label][label_keys[URL_INDEX]]:
                    label_data[label][label_keys[URL_INDEX]].append(row_num - 1)

with open(sys.argv[3], 'w') as json_file:
    json_file.write(json.dumps({'data': label_data.values()}))

content_data = []
content_keys = ['content_id', 'type', 'url', 'title']
CONTENT_INDEX = 0
TYPE_INDEX = 1
URL_INDEX = 2
TITLE_INDEX = 3
for row_num in range(1, worksheet.nrows):
    row_data = {}
    for col_num, cell in enumerate(worksheet.row(row_num)):
        if col_num == 0:        
            row_data[content_keys[CONTENT_INDEX]] = row_num - 1
        if col_num == TYPE_INDEX:
            row_data[content_keys[TYPE_INDEX]] = cell.value
        if col_num == URL_INDEX:
            row_data[content_keys[URL_INDEX]] = cell.value
            #title
            title = row_data[content_keys[URL_INDEX]].split('/')
            title = title[len(title) - 1]
            title = title.replace('%20', ' ').replace('-', ' ').replace('.pdf', ' delete')
            title = title.split()
            title = " ".join(title[0:len(title) - 1])
            row_data[content_keys[TITLE_INDEX]] = title
    content_data.append(row_data)

with open(sys.argv[4], 'w') as json_file:
    json_file.write(json.dumps({'data': content_data}))
