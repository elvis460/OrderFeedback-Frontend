<template>
  <div class="col-md-12">
    <table class="table  table-hover" style="text-align:left"> 
      <thead class="thead-light"> 
        <tr> 
          <th scope="col">OrderID</th> 
          <th scope="col">Delivey Time</th> 
          <th scope="col">Feedback</th>
        </tr> 
      </thead> 
      <tbody> 
        <tr v-for="order in orders"> 
          <th scope="row">{{order.order_id}}</th>
          <td>{{order.delivery_date}} - {{order.delivery_time}}</td> 
          <td>
            <button type="button" v-if="order.feedback_submitted" class="btn btn-info" @click="showFeedback(order.order_id)">
<i class="fa fa-info-circle" aria-hidden="true"></i>
            </button>
            <button type="button" v-if="!order.feedback_submitted" @click="order_detail=order" class="btn btn-success" data-toggle="modal" data-target="#CreateFeedbackModal"><i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
          </td> 
        </tr>
      </tbody> 
    </table>
    <Modal :order="order_detail"></Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal';

export default {
  name: 'Orders',
  components: {
    Modal
  },
  data () {
    return {
      orders: [],
      order_detail: {}
    }
  },
  created() {
    this.getOrders()
  },
  methods:{
    getOrders(){
      const vm = this;
      this.axios.get('/orders').then(function(response) {
        if (response.status == 200) {
          vm.orders = response['data']['orders']
        } else {
        }
      })
      .catch(function(error) {
        console.log('error:', error)
      });
    },
    showFeedback(order_id){
      this.$router.push({ name: 'OrderFeedback', params: { order_id: order_id } })
    }
  }
}
</script>

<style>
  .table{
    margin-top: 5%
  }
</style>
