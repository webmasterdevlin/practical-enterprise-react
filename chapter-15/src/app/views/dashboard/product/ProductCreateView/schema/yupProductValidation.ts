import * as Yup from 'yup';

export const yupProductValidation = Yup.object().shape({
  category: Yup.string().max(255),
  description: Yup.string().max(5000),
  images: Yup.array(),
  includesTaxes: Yup.bool().required(),
  isTaxable: Yup.bool().required(),
  name: Yup.string().max(255).required(),
  price: Yup.number().min(0).required(),
  productCode: Yup.string().max(255),
  productSku: Yup.string().max(255),
  salePrice: Yup.number().min(0),
});
