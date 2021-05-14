function readCSVfile(file, callback){
	const fileReader = wx.getFileSystemManager();
	const fileData = fileReader.readFile({
		filePath: file,
		encoding: "utf-8",
		success(res){
			const { data } = res;
			callback(csvToObj(data));
		}
	});
}

function csvToObj(csvString) {
	const csvArray = csvString.split("\r\n");
	let result = [];
	for(let i = 1; i< csvArray.length-2; i++){
		result.push({
			index: i,
			value: csvArray[i].split(",")[4]
		});
	}
	return result;
}

//filename filedata zsname zstype latest
class BasicTemperature {
	construcator(){

	}
}

function currentTemperature(pmData, pbData){
	if(!pmData && !pbData && pmData.length !== pbData.length) {
		return "Error";
	}
	const valueArr = (data) => {
		let arr = [];
		data.map(item=>arr.push(item.value));
		return arr;
	}
	return computedTemperature(pmData[0].value, valueArr(pmData), pbData[0].value, valueArr(pbData));
}

function computedTemperature(pm, pmvalArr, pb, pbvalArr){
	const pmArr = pmvalArr.sort((a, b)=> a - b);
	const pbArr = pbvalArr.sort((a, b)=> a - b);
	let pmPre = pmArr.findIndex(v=>v===pm);
	pmPre = (pmPre === 1 ? 1 : (pmPre === 0 ? 0 : pmPre/(pmvalArr.length-1))) * 100;
	let pbPre = pbArr.findIndex(v=>v===pb);
	pbPre = (pbPre === 1 ? 1 : (pbPre === 0 ? 0 : pbPre/(pbvalArr.length-1))) * 100;
	return (pmPre+pbPre)/2;
}

//拆分和数据归组
function splitTemperatureToGroup(files){
	//格式化添加参数
	let files = files.map(file=>{
		const { fileName } = file;
		file.pName = `${fileName.split("_")[0]}`;
		file.pType = `${fileName.split("_")[1]}`;
		file.name = `${fileName.split("_")[0]}(${fileName.split("_")[4]})`;
	});
	//去重
	files = files.reduce(function(arr, cur){
		if(arr.findIndex(i=>i.name === cur.name) === -1) arr.push(cur);
		return arr;
	}, []);
	//分组返回对象
	const groupBy = (objectArr, property) => {
		return objectArr.reduce(function(newArr, cur){
			const key = cur(property);
			if(!newArr[key]) newArr[key] = [];
			newArr[key].push(cur);
			return newArr;
		}, {});
	}
	const filesGrouped = groupBy(files, "name");
	//再拆分两组： 单组提示，多组保存
	let success = {} , failure = [];
	Object.keys(filesGrouped).map(key=>{
		const len = filesGrouped(key).length;
		len > 1 ? success = { ...success, ...filesGrouped(key) } : failure.push(key);
	});
	return { success: success, failure: failure };
}

export {
	readCSVfile, currentTemperature, splitTemperatureToGroup
}