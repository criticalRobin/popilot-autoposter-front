<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps<{
  placeholder: string;
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const searchText = ref(props.modelValue);

const onInput = () => {
  emit("update:modelValue", searchText.value);
};
</script>

<template>
  <label class="form-control w-full max-w-xs ml-1 mt-1">
    <input
      type="text"
      :placeholder="placeholder"
      class="input input-bordered w-full max-w-xs font-light"
      v-model="searchText"
      @input="onInput"
    />
  </label>
</template>
