<template>
  <div ref="chart" style="width: 100vw;height: 100vh;"></div>
</template>
<script setup>
import *as echarts from 'echarts';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const chart = ref();
const mapJSON = ref();
// const mapName = ref();
const props = defineProps({ name: { default: '中国' }, adcode: { default: '100000' } });
onMounted(() => {
  axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/${props.adcode}_full.json`).then((res) => {
    // console.log(res);
    mapJSON.value = res.data;
    if (mapJSON.value) {
      init();
    };
  });
});
function init() {
  const myChart = echarts.init(chart.value);
  // 注册可用的地图
  echarts.registerMap(props.name, mapJSON.value);
  // 指定图表的配置项和数据
  const option = {
    visualMap: {
      min: 800,
      max: 500,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered']
      }
    },
    series: [
      {
        type: 'map',
        map: `${props.name}`,
        label: {
          show: true
        },
        roam: true, //开启缩放和平移
        zoom: 1.2,
      }
    ],
  };
  // 使用刚指定的配置项和数据显示图表
  myChart.setOption(option);
  myChart.on('click', (params) => {
    // console.log(params);
    const clickName = params.name; // 选中地区的名称
    // 发起请求获取地区信息
    axios.get(`https://restapi.amap.com/v3/geocode/geo?key=7e96a646059704d70e2c16243ee2b1d4&address=${encodeURIComponent(clickName)}`)
      .then(response => {
        const data = response.data;
        // console.log(data.geocodes[0].adcode.substr(2, 4));
        if (data.status === '1' && data.geocodes.length > 0 && data.geocodes[0].adcode.substr(2, 4) === '0000') {
          const adcode = data.geocodes[0].adcode;
          // console.log(adcode); // 输出地区的 adcode
          router.push({
            path: '/area',
            query: { area: params.name, adcode: adcode }
          });
        } else {
          console.log('未找到对应的地区');
        }
      })
      .catch(error => {
        console.error('请求出错：', error);
      });
  });
};
</script>
<style></style>