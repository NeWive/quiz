import json
import matplotlib.mlab as mlab
import matplotlib.pyplot as plt


# 解决乱码问题
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False


keyMaps = {
    'school': [
         '海大', '山大青岛', '青科', '青农', '恒星学院', '青大', '其他'
    ],
    'sex': [
         '男', '女'
    ],
    'grade': [
        '大一', '大二', '大三', '大四', '其他'
    ],
    'major': [
         '理科类', '工科类', '文史类', '社科类', '其他'
    ]
}


def handle_result(file_name, key):
    with open(file_name, 'r', encoding='utf-8') as j:
        source = json.load(j)
    for item in source:
	total = 0;
	for i in item:
	
		

handle_result('./grade_total.json',  'grade')
handle_result('./major_total.json',  'major')
handle_result('./school_total.json',  'school')
handle_result('./sex_total.json',  'sex')
