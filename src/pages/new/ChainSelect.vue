<template>
    <div>
      <!-- 选择链按钮 -->
      <button @click="showModal = true" class="open-btn">选择链</button>
  
      <!-- 弹窗 -->
      <div
        v-if="showModal"
        class="chain-select-modal"
        @click.self="handleClose"
      >
        <div class="chain-select-content">
          <div class="header">
            <span>Select  Chain</span>
            <span class="close-btn" @click="handleClose">✕</span>
          </div>
          <div class="search-box">
            <input
              v-model="search"
              type="text"
              placeholder="搜索"
            />
          </div>
          <div class="chain-list">
            <div
              v-for="chain in filteredChains"
              :key="chain.value"
              class="chain-item"
              :class="{ active: chain.value === selected }"
              @click="select(chain.value)"
            >
              <img :src="chain.icon" class="chain-icon" alt="" />
              <span class="chain-name">{{ chain.label }}</span>
              <span v-if="chain.value === selected" class="check-mark">✔</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 显示当前选中 -->
      <div class="selected-info">
        当前选择：<b>{{ selectedLabel }}</b>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ChainSelectDemo",
    data() {
      return {
        showModal: false,
        selected: "cp",
        search: "",
        chains: [
          { label: "CP CHAIN", value: "cp", icon: "/img/cpchain.png" },
          { label: "Ethereum", value: "eth", icon: "/img/eth.png" },
          { label: "BNB CHAIN", value: "bnb", icon: "/img/bnb.png" }
        ]
      };
    },
    computed: {
      filteredChains() {
        return this.chains.filter(
          c =>
            c.label.toLowerCase().includes(this.search.toLowerCase()) ||
            c.value.toLowerCase().includes(this.search.toLowerCase())
        );
      },
      selectedLabel() {
        const sel = this.chains.find(c => c.value === this.selected);
        return sel ? sel.label : "";
      }
    },
    methods: {
      select(val) {
        this.selected = val;
        this.handleClose();
      },
      handleClose() {
        this.showModal = false;
        this.search = "";
      }
    }
  };
  </script>
  
  <style scoped lang="scss">
  .open-btn {
    margin: 40px;
    padding: 8px 24px;
    border-radius: 8px;
    border: none;
    background: #23242b;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
  
  .selected-info {
    margin: 30px 0 0 40px;
    font-size: 16px;
    color: #fff;
  }
  
  .chain-select-modal {
    position: fixed;
    inset: 0;
    z-index: 2000;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .chain-select-content {
    width: 390px;
    background: #181a20;
    border-radius: 24px;
    padding: 24px 0 12px 0;
    box-shadow: 0 4px 32px 0 rgba(0,0,0,0.35);
    animation: showModal .2s;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 22px;
      font-weight: bold;
      color: #fff;
      padding: 0 32px 8px 32px;
      .close-btn {
        font-size: 26px;
        cursor: pointer;
        user-select: none;
        transition: color 0.15s;
        &:hover { color: #ccc; }
      }
    }
    .search-box {
      margin: 0 32px 16px 32px;
      input {
        width: 100%;
        border: none;
        outline: none;
        background: #23242b;
        border-radius: 12px;
        height: 38px;
        padding: 0 14px;
        font-size: 15px;
        color: #eee;
        &::placeholder {
          color: #888;
        }
      }
    }
    .chain-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin: 0 24px;
      .chain-item {
        display: flex;
        align-items: center;
        gap: 16px;
        height: 54px;
        cursor: pointer;
        border-radius: 14px;
        padding: 0 16px;
        transition: background .13s;
        color: #fff;
        font-size: 17px;
        font-weight: 500;
        .chain-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #23242b;
          object-fit: contain;
        }
        .chain-name {
          flex: 1;
        }
        .check-mark {
          color: #00e782;
          font-size: 22px;
          font-weight: bold;
        }
        &:hover, &.active {
          background: #23242b;
        }
      }
    }
  }
  
  @keyframes showModal {
    from { transform: scale(0.92); opacity: 0;}
    to   { transform: scale(1); opacity: 1;}
  }
  </style>
  