import { mount } from 'avoriaz';
import moxios from 'moxios';
import Modal from '@/components/Modal';

describe('Modal.vue', () => {

  it('show correct order detail value', () => {
    const wrapper = mount(Modal);
    const order_detail = {
	    "id": 2,
	    "order_id": "ORD1519988042",
	    "delivery_date": "2018-03-02",
	    "delivery_time": "10:54 - 11:24 AM",
	    "feedback_submitted": true,
	    "order_items": [{
	        "order_item_id": 2,
	        "name": "Beef Bulgogi Bibimbap"
	      },
	      {
	        "order_item_id": 3,
	        "name": "Tofu‑Powered Tabbouleh"
	      }
	    ]
    }
    
    wrapper.setProps({order: order_detail})

    expect(wrapper.vm.order).to.equal(order_detail)
  })

})
