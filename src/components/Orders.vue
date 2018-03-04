<template>
  <div class="col-md-12">
    <table class="table" style="text-align:left"> 
      <thead class="thead-light"> 
        <tr> 
          <th scope="col">#</th> 
          <th scope="col">Delivey Time</th> 
          <th scope="col">Feedback</th>
        </tr> 
      </thead> 
      <tbody> 
        <tr v-for="order in orders"> 
          <th scope="row">{{order.order_id}}</th>
          <td>{{order.delivery_date}} - {{order.delivery_time}}</td> 
          <td>
            <button type="button" v-if="order.feedback_submitted" class="btn btn-primary">Show Feedback</button>
            <button type="button" v-if="!order.feedback_submitted" @click="order_detail=order" class="btn btn-primary" data-toggle="modal" data-target="#CreateFeedbackModal">Give Feedback</button>
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
    }
  }
}
</script>