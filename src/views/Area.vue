<template>
  <Map :name="mapName" :adcode="adcode"></Map>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Map from '../components/Map.vue';
const mapName = ref();
const adcode = ref();
const route = useRoute();
mapName.value = route.query.area;
adcode.value = route.query.adcode;
</script>
<style></style>