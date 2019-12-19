<template>
	<!-- 	<van-popup :show="isShowTimesModel" position="bottom" :overlay="true" @close="onClose($event.mp)" :duration="300">
		<van-datetime-picker :type="types" :value="currentDate" :min-date="minDate" :max-date="maxDate" @confirm="onChangeTimes($event.mp)" @cancel="onClose($event.mp)" />
	</van-popup> -->
	<view v-show=isShowTimesModel class="isShowTimesModelView">
		<view  class="isShowTimesModel">
			<view class="uni-padding-wrap">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @click="onClose">取消</view>
					<view class="action text-blue" @click="isOk">确定</view>
				</view>
			</view>
			<picker-view class="mpvue-picker-view" v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
				<picker-view-column>
					<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
	import util from '@/utils/utils';
	import vanPopup from '@/wxcomponents/vant/popup/index.js';
	import vanDatetimePicker from '@/wxcomponents/vant/datetime-picker/index.js';

	export default {
		components: {
			vanPopup,
			vanDatetimePicker
		},
		props: {
			isShowTimesModel: {
				type: Boolean,
				default: false
			},
			types: {
				type: String,
				default: 'date'
			},
			minDate: {
				type: Number,
				default: new Date(1990, 1, 1).getTime()
			},
			currentDate: {
				type: Number,
				default: new Date().getTime()
			}
		},
		data: function() {
			return {
				//
				test: 1545290433926,
				maxDate: new Date(2030, 12, 30).getTime(),
				times: null, //时间
				timestamp: null, //时间戳	
			};
		},
		data() {
			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			for (let i = 1970; i <= date.getFullYear(); i++) {
				years.push(i)
			}
			for (let i = 1; i <= date.getMonth() + 1; i++) {
				months.push(i)
			}
			return {
				title: 'picker-view',
				years,
				year,
				months,
				month,
				value: [9999, month - 1],
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
			}
		},
		methods: {
			// onChangeTimes(e) {
			// 	console.log(e)
			// 	let times = e.detail / 1000; //秒级别的时间撮，需要转成毫秒去掉/1000
			// 	this.isShowTimesModel = false;
			// 	let selecTime = {
			// 		times: times,
			// 		timestamp: times,
			// 		isShowTimesModel: this.isShowTimesModel
			// 	};
			// 	this.$emit('tellParentTimes', selecTime);
			// },
			bindChange(e) {
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]

			},
			isOk(e) { // 拿到那些值进行传出去
				let times = new Date(this.year, this.month - 1).getTime() / 1000;
				this.$emit('tellParentTimesModel', false);
				let selecTime = {
					times: times,
					timestamp: times,
					isShowTimesModel: false
				};
				this.$emit('tellParentTimes', selecTime);

			},
			onClose() {
				this.$emit('tellParentTimesModel', false);
			},

		}
	};
</script>
<style scoped>
	.isShowTimesModelView {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 999;
	}

	.isShowTimesModel {
		position: fixed;
		top: 50%;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #FFFFFF;
		z-index: 199999;
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
