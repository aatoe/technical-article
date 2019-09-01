export default {
    // calcSum(num1,num2){
    //     var sum = num1 + num2;
    //     return sum;
    // }
    // calcSum:function(num1,num2){
    //     var sum = num1 + num2;
    //      return sum;
    // }
    methods: {  //这种是.vue文件中的默认导出.vue每个文件都是默认导出的
        calcSum: function (num1, num2) {
            var sum = num1 + num2;
            return sum;
        }
    },


}