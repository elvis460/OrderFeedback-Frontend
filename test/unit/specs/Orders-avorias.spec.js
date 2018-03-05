import { mount, shallow } from 'avoriaz';
import moxios from 'moxios';
import Orders from '@/components/Orders';
import Modal from '@/components/Modal';

window.Promise = require('promise')
describe('Orders.vue', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })

  it ('contain Modal component', () => {
  	const vm = shallow(Orders)
		expect(vm.contains(Modal)).to.equal(true)
  })

  it('should render correct array', done => {
    moxios.stubRequest('/orders', {
      status: 200,
      response: {
        "orders": [{
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
          },
          {
            "id": 1,
            "order_id": "ORD1519988032",
            "delivery_date": "2018-03-02",
            "delivery_time": "10:53 - 11:23 AM",
            "feedback_submitted": true,
            "order_items": [{
              "order_item_id": 1,
              "name": "Laksa Potato Salad"
            }]
          }
        ]
      }
    })
    const vm = mount(Orders);
    moxios.wait(function() {
    	expect(vm.data().orders.length).to.equal(2);
      expect(vm.data().orders[0]['order_id']).to.equal('ORD1519988042');
      done()
    })
  })

  it('render correct Feedback status', done => {
    moxios.stubRequest('/orders', {
      status: 200,
      response: {
        "orders": [{
            "feedback_submitted": false,
          },
          {
            "feedback_submitted": true,
          }
        ]
      }
    })
    const vm = mount(Orders);
    moxios.wait(function() {
    	expect(vm.find('.btn-success').length).to.equal(1)
    	expect(vm.find('.btn-info').length).to.equal(1)
      done()
    })
  })
})
