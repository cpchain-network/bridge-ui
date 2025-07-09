<template>
    <div class="progress-container">
      <div class="progress-text">{{ progressPercentage }}%</div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      progress: {
        type: Number,
        default: 0
      }
    },
    computed: {
      progressPercentage() {
        // Ensures the progress doesn't exceed 100%
        return Math.min(this.progress, 100);
      }
    }
  };
  </script>
  
  <style scoped>
  .progress-container {
    text-align: center;
    margin: 10px;
  }
  
  .progress-text {
    margin-bottom: 2px;
    font-size: 12px;
    color: white;
  }
  
  .progress-bar {
    background-color: #ddd;
    border-radius: 10px;
    /* padding: 3px; */
  }
  
  .progress-fill {
    background-color: #01ffdb;
    height: 5px;
    border-radius: 8px;
    transition: width 0.5s ease-in-out;
  }
  </style>
  