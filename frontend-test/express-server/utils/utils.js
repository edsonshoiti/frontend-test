function utils() {

  this.resultItemDetail = function(item) {
    return {
      author: {
        name: 'Name',
        lastname: 'Last Name',
      },
      item: {
        id: item.id,
        title: item.title,
      },
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: 0,
      },
      picture: item.pictures[0].url,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.sold_quantity,
      description: '',
      categories: [],
    }
  }

  this.resultItemSearch = function(items) {
    return {
      author: {
        name: 'Name',
        lastname: 'Last Name',
      },
      items: items.map((item) => {
        return {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: item.price,
            decimals: 0,
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
          location: item.address.state_name,
          categories: [],
        }
      })
    }
  }
}
module.exports = utils;