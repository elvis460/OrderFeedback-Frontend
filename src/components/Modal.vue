<template>
  <div class="modal fade bd-example-modal-lg" id="CreateFeedbackModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{order.order_id}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
          	<div class="form-group" v-for="item in order.order_items">
          		<label for="recipient-name" class="col-form-label">How did <span class="font-weight-bold">{{item.name}}</span> tasted?</label>
	            <div class="input-group">	
					      <input type="text" placeholder="Leave a comment to the dish..." class="form-control" aria-label="Text input with dropdown button" v-model="item.comment">
					      <div class="btn-group">
					        <button type="button" class="btn btn-secondary btn-success" @click="rating(item, 1)">
					          Good
					        </button>
					        <button type="button" class="btn btn-secondary btn-danger" @click="rating(item, -1)">
					          Bad
					        </button>
					      </div>
					    </div>
					   </div>

					   <div class="form-group">
          		<label for="recipient-name" class="col-form-label">How about our <span class="font-weight-bold">delivery</span>?</label>
	            <div class="input-group">	
					      <input type="text" placeholder="Leave a comment to the delivery..." class="form-control" aria-label="Text input with dropdown button" v-model="order.comment">
					      <div class="btn-group">
					        <button type="button" class="btn btn-secondary btn-success" @click="rating(order, 1)">
					          Good
					        </button>
					        <button type="button" class="btn btn-secondary btn-danger" @click="rating(order, -1)">
					          Bad
					        </button>
					      </div>
					    </div>
					   </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary btn-lg btn-block" @click="CreateFeedback">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import toastr from 'toastr'

export default {
  name: 'Modal',
  data () {
    return {
    	feedbacks: []
    }
  },
  props: ['order'],
  methods:{
  	rating(target, value){
  		this.$set(target,"rating",value)
  	},
  	CreateFeedback(){
  		this.feedbacks = []
  		var order = this.order
  		var items = this.order.order_items
  		var vm = this
  		// build the feedback payload
  		this.feedbacks.push({"ratable_id": order.id, "ratable_type": "DeliveryOrder", "rating": order.rating, "comment": order.comment})
  		
  		$.each(items, function(i, item){
			  vm.feedbacks.push({"ratable_id": item.order_item_id, "ratable_type": "OrderItem", "rating": item.rating, "comment": item.comment})
			});
  		// post feedbacks to server
  		var resuet_url = 'orders/' + this.order.id +'/feedbacks'
			this.axios.post(resuet_url, {
        feedbacks: vm.feedbacks
      })
      .then(function(response) {
        if (response.status == 200) {
        	vm.feedbacks = []
        	order.feedback_submitted = true
      	  $('#CreateFeedbackModal').modal('hide')
      	  vm.successToastr('Create Feedback Success!')
        }
      })
      .catch(function(error) {
      	vm.errorToastr('Please rating for the order.')
      });
  	},
  	successToastr: function(msg) {
    	toastr.success(msg)
  	},
  	errorToastr: function(msg) {
    	toastr.error(msg)
  	},
  }
}
</script>