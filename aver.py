import json


school = {}
gender = {}
major = {}
grade = {}
key_map = {
	'school': [
		'海大', '山大青岛', '青岛科技', '青农', '恒星学院', '青大', '其他'
	],
	'sex': [
		'男','女'
	],
	'grade': [
		'大一','大二','大三','大四','其他'
	],
	'major': [
		'理科类','工科类','文史类','社科类','其他'
	]
}

def handle(file, target, key):
	with open(file,'r',encoding='utf-8') as j:
		source = json.load(j)
	for item in source:
		aver = 0
		people = 0
		itemcontent = source[item]
		for number in itemcontent:
			aver += int(number) * itemcontent[number]
			people += itemcontent[number]
		result = aver/people
		print(key_map[key][int(item) - 1] + ':')
		print(result)	
		


handle('./grade_total.json', grade, 'grade')
handle('./major_total.json', major, 'major')
handle('./school_total.json', school, 'school')
handle('./sex_total.json', gender, 'sex')
