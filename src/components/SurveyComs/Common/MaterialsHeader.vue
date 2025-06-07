<template>
  <div>
    <div class="container mb-15">
      <h2
        class="title font-weight-100"
        :style="{
          fontSize: titleSize + 'px',
          color: titleColor,
        }"
      >
        <span
          :class="{
            'font-bold': !titleWeight,
            'font-italic': !titleItalic,
          }"
          >{{ serialNum < 10 ? '0' + serialNum : serialNum }}.</span
        ><span
          :class="{
            'font-bold': !titleWeight,
            'font-italic': !titleItalic,
          }"
          >{{ title }}</span
        >
      </h2>
      <div
        class="desc"
        :class="{
          'font-bold': !descWeight,
          'font-italic': !descItalic,
        }"
        :style="{
          fontSize: descSize + 'px',
          color: descColor,
        }"
      >
        {{ desc }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  serialNum: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  titleSize: {
    type: String,
    default: '18',
  },
  titleWeight: {
    type: Number,
    default: 0,
  },
  titleItalic: {
    type: Number,
    default: 0,
  },
  titleColor: {
    type: String,
    default: '#000',
  },
  desc: {
    type: String,
    default: '请输入题目说明（选填）',
  },
  descSize: {
    type: String,
    default: '14',
  },
  descWeight: {
    type: Number,
    default: 0,
  },
  descItalic: {
    type: Number,
    default: 0,
  },
  descColor: {
    type: String,
    default: '#666',
  },
})
</script>

<style scoped lang="scss">
.container {
  > h2 {
    font-size: 20px;
    > span {
      margin: 0 5px;
    }
  }
}
.desc {
  font-size: var(--font-size-base);
  color: var(--font-color-light);
  text-indent: 5px;
}
</style>
