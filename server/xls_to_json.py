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
  $ python xls_to_json.py in.xls Sheet1 out.json

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

data = []
keys = [v.value.lower() for v in worksheet.row(0)]
keys.append(unicode("title", "utf-8"))
for row_number in range(worksheet.nrows):
    if row_number == 0:
        continue
    row_data = {}
    for col_number, cell in enumerate(worksheet.row(row_number)):
        keywords = cell.value.split(',')
    	for keyword in keywords:
            keyword = "".join(ch for ch in keyword if ch.isalnum() or ch == ' ').strip()
            row_data[keys[col_number]] = keyword
            for temp_num, temp_cell in enumerate(worksheet.row(row_number)):
                if temp_num == 0:
                    continue
                row_data[keys[temp_num]] = temp_cell.value
        #title
        title = row_data[keys[2]].split('/')
        title = title[len(title) - 1].replace('%20', ' ').replace('-', ' ').replace('.pdf', '')
        row_data[keys[3]] = title
    data.append(row_data)

with open(sys.argv[3], 'w') as json_file:
    json_file.write(json.dumps({'data': data}))
