<template>
	<view v-show=isShowCarAreaModel class="isShowCarAreaModelView">
	<view  class="isShowCarAreaModel">
		<view class="uni-padding-wrap">
			<view class="cu-bar bg-white">
				<view class="action text-blue" @click="onClose">取消</view>
				<view > 选择上牌的地区 </view>
				<view class="action text-blue" @click="isOk">确定</view>
			</view>
		</view>
		<picker-view class="mpvue-picker-view" v-if="visible" :indicator-style="indicatorStyle"  @change="bindChange">
			<picker-view-column>
				<view class="item" v-for="(item,index) in areasData" :key="index">{{item.name}}</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for="(item,index) in city" :key="index">{{item.name}}</view>
			</picker-view-column>
		</picker-view>
	</view>
	</view>
</template>

<script>
	// import lib from '@/api/lib.js';
	// import urls from '@/api/url.js';
	// import util from '@/utils/utils';
	import areasData from "./areas.js"
	export default {
		components: {
		},
		props: {
			isShowCarAreaModel: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				areaList: {},
				showNum: 2,
				currentProvince: "北京",
				currentCity:"市辖区",
				city: [{name:"市辖区"}],
				areasData:null,
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
			};
		},
		async onReady() {
			// await this.getAreaList();
			
		},
		mounted() {
			this.areasData = areasData;
		},
		methods: {
			bindChange(e){
				let val = e.detail.value;
				this.currentProvince = this.areasData[val[0]].name;
				this.currentCity = this.areasData[val[0]].children[val[1]].name;
				this.areasData.forEach(item=>{
					if(item.name == this.currentProvince){
						this.city = item.children;					
					}
				})
			},
			isOk() {	//确认
				// console.log(this.currentProvince,this.currentCity)
				const params = {
					province: this.currentProvince,
					city: this.currentCity,
					isShowCarAreaModel: false
				};
				this.$emit('tellParentAreaInfo', params);
			},
			// confirmArea(e) {
			// 	//确认
			// 	console.log(e)
			// 	this.province = e.detail.values[0].name;
			// 	this.city = e.detail.values[1].name;
			// 	this.isShowCarAreaModel = false;
			// 	const params = {
			// 		province: this.province,
			// 		city: this.city,
			// 		isShowCarAreaModel: this.isShowCarAreaModel
			// 	};
			// 	this.$emit('tellParentAreaInfo', params);
			// },
			onClose() {
				this.$emit('tellParentAreaModel', false);
			},
			// async getAreaList() {
			// 	const datas = await lib.request(urls.getAreaList, {}, '');
			// 	this.areaList = util.sortAreaList(datas.data);
			// 	// console.log("province_list",this.areaList.province_list)
			// 	// console.log("city_list",this.areaList.city_list)
			// }
		}
	};
</script>

<style scoped>
	.isShowCarAreaModel {
		position: fixed;
		top: 50%;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #FFFFFF;
		z-index: 199999;
	}
	.isShowCarAreaModelView{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0,0,0,0.7);
		z-index: 999;
	}
	
	.mpvue-picker-view {
		width: 100%;
		height: 50%;
		background-color: rgba(255, 255, 255, 1);
	}
	
	.item {
		text-align: center;
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 30rpx;
	}
</style>


