<script lang="ts" setup>
const props = defineProps<{
  title: string;
  description: string;
  imageUrl: string | undefined;
  shceduledAt: Date | undefined;
}>();
</script>

<template>
  <div class="card bg-base-100 image-full w-96 h-96 shadow-xl">
    <figure class="w-full h-full">
      <img
        :src="props.imageUrl"
        alt="Shoes"
        class="object-cover w-full h-full"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ props.title }}</h2>
      <p>{{ props.description }}</p>
      <div class="card-actions justify-end">
        <button disabled class="btn btn-primary">
          <span class="text-white font-semibold">
            {{
              props.shceduledAt
                ? new Date(props.shceduledAt).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })
                : "N/A"
            }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
