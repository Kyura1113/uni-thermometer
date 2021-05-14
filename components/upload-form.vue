<template>
    <view class="upload-wrapper">
        <template v-if="type !== 'batch'">
            <view class="upload-form van-hairline--surround" v-for="(item, index) in uploadList" :key="index">
				<view class="upload-label van-hairline--bottom">{{item.label}}</view>
				<view class="upload-content">
					<view class="upload-button" @tap="handleUpload(item)">导入CSV</view>
					<view class="upload-file">
						<view class="upload-file-name van-ellipsis">{{item.fileName}}</view>
						<view class="upload-cancel" v-show="item.fileName" @tap="handleCancelFile(item)">
							<van-icon name="clear" size="20px"/>
						</view>
					</view>
				</view>
			</view>
        </template>
        <template v-else>
            <view class="upload-form van-hairline--surround">
                <view class="upload-label van-hairline--bottom">{{label}}</view>
                <view class="upload-content-batch">
                    <view class="upload-content--left">
                        <view class="upload-button" @tap="handleUploadBatch">批量导入CSV</view>
                        <view class="upload-button" v-show="uploadFiles.length>0" @tap="uploadFiles = []">清空导入</view>
                    </view>
                    <view class="upload-content--right">
                        <view class="upload-file" v-for="(file, index) in uploadFiles" :key="index">
                            <view class="upload-file-name van-ellipsis">{{file.fileName}}</view>
                            <view class="upload-cancle" v-show="file.fileName" @tap="handleCancelFile(file, index)">
                                <van-icon name="clear" size="20px"/>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </template>
    </view>
</template>

<script>

const BASIC_DEFIND = {
	LOWEST_VAL : {
		color: "#7CFFB2", advice: "全安排上"
	},
	LOWER_VAL : {
		color: "#58D9F9", advice: "安排八成"
	},
	MIDDLE_VAL: {
		color: "#FDDD60", advice: "不安排了先等着"
	},
	BIGGER_VAL: {
		color: "#FDAB4D", advice: "留下五成"
	},
	BIGGEST_VAL: {
		color: "#FF5263", advice: "赶紧跑路"
	}
}

export default {
    name: "UploadForm",
    props: [],
    data(){
        return {
			type: "batch", //批量
			uploadFiles: [],
			uploadList: [
				{ index: 0, label: "PE", fileContent: {}, fileName: "" },
				{ index: 1, label: "PB", fileContent: {}, fileName: "" }
			],
		}
    },
    methods:{
        async handleUpload(item){
            const { index } = item;
            const { data, name } = await new Promise((resolve, reject)=>{
                wx.chooseMessageFile({
                    count: 1,
                    type: "file",
                    success(res){
                        const { path, name } = res.tempFiles[0];
                        util.readCSVfile(path, (v)=>{
                            resolve({ data: v, name: name });
                        })
                    }
                });
            });
            const temp = {
                ...item,
                fileContent: data,
                fileName: name
            };
            this.$nextTick(()=>{
                this.$set(this.uploadList, index, temp);
            });
        },
        async handleUploadBatch(){
            const uploadFiles = await new Promise((resolve, reject)=>{
                wx.chooseMessageFile({
                    count: 40,
                    type: "file",
                    success(res){
                        let result = [];
                        const files = res.tempFiles;
                        files.map((file, index)=>{
                            const { path, name } = file;
							//if判断文件是否未csv和不添加重复文件
							if(name.substring( name.lastIndexOf(".") + 1, name.length).toLowerCase() === "csv" ||
							uploadFiles.findIndex(item.name === name) > -1 ){
								return ;
							}
                            const obj = util.readCSVfile(path, (v)=>{ return { fileContent: v, fileName: name} });
                            result.push(obj);
                            if(index === files.length-1){
                                resolve(result);
                            }
                        })
                    }
                });
            });
            this.$nextTick(()=>{
                this.uploadFiles.push(uploadFiles); 
            });
        },
        handleCancelFile(item, index = 0){
            if(this.type === "batch"){
                this.uploadFiles.slice(index, 1);
            }else{
                const { index } = item;
                this.uploadList[index].fileContent = {};
                this.uploadList[index].fileName = "";
            }
        },
		handleComputed(){
			if(!this.uploadList[0].fileName || !this.uploadList[1].fileName) return console.log('failure');
			const { fileName } = this.uploadList[0];
			const name = `${fileName.split("_")[0]}(${fileName.split("_")[4]})`;  
			let result = util.currentTemperature(this.uploadList[0].fileContent, this.uploadList[1].fileContent);
			result = result ? result.toFixed(4) : result;
			
			const getFormData = (name, result) => {
				let obj = { name: name, val: result };
				if(result >= 50){
					return { ...obj, ...BASIC_DEFIND.BIGGEST_VAL };
				}else if(result >= 40 && result < 50){
					return { ...obj, ...BASIC_DEFIND.BIGGER_VAL };
				}else if(result >= 30 && result < 40){
					return { ...obj, ...BASIC_DEFIND.MIDDLE_VAL };
				}else if(result >= 10 && result < 30){
					return { ...obj, ...BASIC_DEFIND.LOWER_VAL };
				}else{ // result < 10:
					return { ...obj, ...BASIC_DEFIND.LOWEST_VAL };
				}
			}
			this.isComputed = false;
			this.resultList.unshift(getFormData(name, result));
		},
		computedBatch(){
			const { success, failure } = util.splitTemperatureToGroup(this.uploadFiles);
			if(failure.length > 0){
				//弹窗提示
			}
			let resultList = [];
			Object.keys(success).map(key=>{
				let [ pbData, peData ] = [ null, null ]; 
				const [ fileGroup, name ] = [ success[key], success[key][0][name] ];
				if(fileGroup[0].pType.toUperCase().indexOf("PB")){
					pbData = fileGroup[0].fileContent;
					peFile = fileGroup[1].fileContent;
				}else{
					pbData = fileGroup[1].fileContent;
					peFile = fileGroup[0].fileContent;
				}
				let val = util.currentTemperature(peData, pbData);
				val = val ? val.toFixed(4) : val;
				resultList.push();
			})
		}

    }
}
</script>

<style lang="less">
@import "@/assets/style/common.less";
.upload-wrapper{
	margin: .p2r(18)[@rpx];
	.upload-form{
		.upload-label{
			background: #CFE6FF;
			height: .p2r(30)[@rpx];
			line-height: .p2r(30)[@rpx];
			text-align: center;
			color: #11635B;
			font-size: 20px;
		}
		.upload-content{
			display: flex;
			position: relative;
			box-sizing: border-box;
			height: .p2r(80)[@rpx];
			margin-bottom: .p2r(20)[@rpx];
			padding: 0 .p2r(12)[@rpx];
			align-items: center;
			justify-content: center;
			.upload-button{
				flex:1;
				width: .p2r(120)[@rpx];
				height: .p2r(48)[@rpx];
				line-height: .p2r(48)[@rpx];
				color: white;
				background: #7db7f5;
				font-size: 14px;
				text-align: center;
				border-radius: 4px;
				font-weight: bold;
			}
			.upload-file{
				flex:2;
				position: relative;
				height: .p2r(36)[@rpx];
				line-height: .p2r(36)[@rpx];
				margin-left: .p2r(12)[@rpx];
				border: 1px solid #d9d9d9;
				padding: 0 .p2r(4)[@rpx];
				width: 0;
				.upload-cancel{
					position: absolute;
					top:-12px;
					right:-6px;
					color: red;
				}
			}
		}
		.upload-content-batch{
			display: flex;
			position: relative;
			box-sizing: border-box;
			margin-bottom: .p2r(20)[@rpx];
			padding: 0 .p2r(12)[@rpx];
			align-items: center;
			justify-content: center;
			.upload-content--left{
				flex: 1;
				.upload-button{
					width: .p2r(120)[@rpx];
					height: .p2r(48)[@rpx];
					line-height: .p2r(48)[@rpx];
					color: white;
					background: #7db7f5;
					font-size: 14px;
					text-align: center;
					border-radius: 4px;
					font-weight: bold;
				}
			}
			.upload-content--right{
				flex: 2;
				.upload-file{
					position: relative;
					height: .p2r(36)[@rpx];
					line-height: .p2r(36)[@rpx];
					margin-left: .p2r(12)[@rpx];
					border: 1px solid #d9d9d9;
					padding: 0 .p2r(4)[@rpx];
					width: 0;
					.upload-cancel{
						position: absolute;
						top:-12px;
						right:-6px;
						color: red;
					}
				}
			}
		}
	}
	.upload-computed{
		width: 100%;
		text-align: center;
		.computed-button{
			background: #18ab9c;
			color: white;
			font-weight: bold;
		}
		.back-button{
			margin-top: .p2r(12)[@rpx];
			background: #18ab9c;
			color: white;
			font-weight: bold;
		}
	}
}
</style>