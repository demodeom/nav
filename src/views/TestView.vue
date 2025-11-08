<template>
  <div>
    <table class="data-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>名称</th>
        <th>价格</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product, index) in products" :key="product.id">
        <td>{{ product.id }}</td>
        <td>{{ product.name }}</td>
        <td>¥{{ product.price }}</td>
        <td>
          <button @click="deleteProduct(index)" class="btn-delete">
            删除
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([
  { id: 1, name: '笔记本电脑', price: 5999 },
  { id: 2, name: '智能手机', price: 3999 },
  { id: 3, name: '平板电脑', price: 2999 },
  { id: 4, name: '智能手表', price: 1299 }
])

const deleteProduct = (index) => {
  const productName = products.value[index].name
  if (confirm(`确定要删除产品 "${productName}" 吗？`)) {
    products.value.splice(index, 1)
  }
}
</script>

<style scoped>
.data-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.data-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.btn-delete {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: #ff5252;
}
</style>