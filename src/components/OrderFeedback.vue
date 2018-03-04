<template>
	<div class="col-md-12">
	  <div class="card text-center feedback-card" v-for="feedback in feedbacks">
		  <div class="card-header">
		  	{{feedback.ratable_type}} {{feedback.ratable_id}} - Feedback
		  </div>
		  <div class="card-body">
		    <p class="card-text font-weight-bold" v-if="feedback.comment">{{feedback.comment}}</p>
				<p class="card-text font-weight-bold" v-if="!feedback.comment">No Comment.</p>
		   </div>
		  <div class="card-footer text-muted">
		  	<p class="rating rating-up" v-if="feedback.rating==1"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></p>
		    <p class="rating rating-down" v-if="feedback.rating==-1"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
		  </p>
		  </div>
		</div>
		<button class="btn btn-block back-btn" @click="$router.push('/')">
			<i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Back
		</button>
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

<style>
	.feedback-card{
		margin: 3%
	}
	.card-body{
		margin: 2%
	}
	.rating{
		margin:0;
		font-size: 18px;
	}
	.rating-up{
		color: green
	}
	.rating-down{
		color: red
	}
	.back-btn, .card-header, .card-footer{
		background-color: #F6F6F6
	}

</style>