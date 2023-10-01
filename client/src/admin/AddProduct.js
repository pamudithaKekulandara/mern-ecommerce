import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { createProduct, getCategories } from './apiAdmin'

const AddProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  })

  const { user, token } = isAuthenticated()
  const [errors, setErrors] = useState({});
  const {
    name,
    description,
    price,
    categories,
    quantity,
    loading,
    error,
    createdProduct,
    formData,
  } = values

  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        })
      }
    })
  }

  useEffect(() => {
    init()
  }, [])

  const validateForm = () => {
    const errors = {}

    // Name validation
    if (!name.match(/^[A-Za-z0-9\s]+$/)) {
      errors.name = 'Name should contain letters and numbers only.'
    }

    // Description validation
    const MAX_DESCRIPTION_LENGTH = 200
    if (description.length > MAX_DESCRIPTION_LENGTH ) {
      errors.description = `Description should not exceed ${MAX_DESCRIPTION_LENGTH} characters.`
    }

    // Price validation
    if (price<1 && price>1000000) {
      errors.price = 'Price should be a valid number.'
    }

    // Quantity validation
    if (quantity<1 && quantity>1000000) {
      errors.quantity = 'Quantity should be a valid number.'
    }
    setErrors({ ...errors, [name]: error });
    return errors
  }

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value })
   
  }

  const clickSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: '', loading: true })

    createProduct(user._id, token, formData).then((data) => {
      // Check if there are any errors
      const errors = validateForm()
      if (Object.keys(errors).length === 0) {
        // Proceed with form submission
           setValues({
             ...values,
             name: '',
             description: '',
             photo: '',
             price: '',
             quantity: '',
             loading: false,
             createdProduct: data.name,
           })
      } else {
        // Display errors to the user
        console.log(errors)
      }
    })
  }

  const newPostForm = () => (
    <form className='mb-3' onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className='form-group'>
        <label className='btn btn-secondary'>
          <input
            onChange={handleChange('photo')}
            type='file'
            name='photo'
            accept='image/*'
          />
        </label>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
          value={name}
        />
        {errors.name && <div className='text-danger'>{errors.name}</div>}
      </div>

      <div className='form-group'>
        <label className='text-muted'>Description</label>
        <textarea
          onChange={handleChange('description')}
          className='form-control'
          value={description}
        />
        {errors.description && (
          <div className='text-danger'>{errors.description}</div>
        )}
      </div>

      <div className='form-group'>
        <label className='text-muted'>Price</label>
        <input
          onChange={handleChange('price')}
          type='number'
          className='form-control'
          value={price}
        />
        {errors.price && <div className='text-danger'>{errors.price}</div>}
      </div>

      <div className='form-group'>
        <label className='text-muted'>Category</label>
        <select onChange={handleChange('category')} className='form-control'>
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Shipping</label>
        <select onChange={handleChange('shipping')} className='form-control'>
          <option>Please select</option>
          <option value='0'>No</option>
          <option value='1'>Yes</option>
        </select>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Quantity</label>
        <input
          onChange={handleChange('quantity')}
          type='number'
          className='form-control'
          value={quantity}
        />
        {errors.quantity && (
          <div className='text-danger'>{errors.quantity}</div>
        )}
      </div>

      <button className='btn btn-outline-primary'>Create Product</button>
    </form>
  )

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: createdProduct ? '' : 'none' }}
    >
      <h2>{`${createdProduct}`} is created!</h2>
    </div>
  )

  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loading...</h2>
      </div>
    )

  return (
    <Layout
      title='Add a new product'
      description={`Hey ${user.name}, ready to add a new product?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  )
}

export default AddProduct
