<template>
	<div class="col-md-12">
	  <div class="card text-center" v-for="feedback in feedbacks">
		  <div class="card-header">
		  	{{feedback.ratable_type}}-{{feedback.ratable_id}} Feedback
		  </div>
		  <div class="card-body">
		    <p class="card-text">{{feedback.comment}}</p>
		    <button class="btn btn-secondary btn-success" v-if="feedback.rating==1">Good</button>
		    <button class="btn btn-secondary btn-danger" v-if="feedback.rating==-1">Bad</button>
		  </div>
		  <div class="card-footer text-muted">
		  </div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'OrderFeedback',
  data () {
    return {
    	feedbacks: []
    }
  },
  created() {
    this.getFeedback()
  },
  methods:{
    getFeedback(){
      const vm = this;
      // get feedbacks from server
  		var resuet_url = 'orders/' + this.$route.params.order_id +'/feedbacks'
      this.axios.get(resuet_url).then(function(response) {
        if (response.status == 200) {
          vm.feedbacks = response['data']['feedbacks']
          console.log(vm.feedbacks)
        } else {
        }
      })
      .catch(function(error) {
        console.log('error:', error)
      });
    },
  }
}
</script>
