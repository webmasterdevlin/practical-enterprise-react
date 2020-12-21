import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import clsx from 'clsx';
import numeral from 'numeral';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Image as ImageIcon,
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
  Search as SearchIcon,
} from 'react-feather';
import {
  Box,
  Button,
  Card,
  Checkbox,
  InputAdornment,
  FormControlLabel,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  makeStyles,
} from '@material-ui/core';

import {
  availabilityOptions,
  categoryOptions,
  sortOptions,
} from 'helpers/inputProductOptions';
import {
  applyFilters,
  applyPagination,
  TableResultsHelpers,
  getInventoryLabel,
} from './tableResultsHelpers';
import { ProductType } from 'models/product-type';

type Props = {
  className?: string;
  products: ProductType[];
};

const Results = ({ className, products, ...rest }: Props) => {
  const classes = useStyles();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const [filters, setFilters] = useState<TableResultsHelpers | any>({
    category: null,
    availability: null,
    inStock: null,
    isShippable: null,
  });

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();

    let value: any = null;

    if (event.target.value !== 'all') {
      value = event.target.value;
    }

    setFilters(prevFilters => ({
      ...prevFilters,
      category: value,
    }));
  };

  const handleAvailabilityChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    event.persist();

    let value: any = null;

    if (event.target.value !== 'all') {
      value = event.target.value;
    }

    setFilters(prevFilters => ({
      ...prevFilters,
      availability: value,
    }));
  };

  const handleStockChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();

    let value: any = null;

    if (event.target.checked) {
      value = true;
    }

    setFilters(prevFilters => ({
      ...prevFilters,
      inStock: value,
    }));
  };

  const handleShippableChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    event.persist();

    let value: any = null;

    if (event.target.checked) {
      value = true;
    }

    setFilters(prevFilters => ({
      ...prevFilters,
      isShippable: value,
    }));
  };

  const handleSortChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setSort(event.target.value);
  };

  const handleSelectAllProducts = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setSelectedProducts(
      event.target.checked ? products.map(product => product.id) : [],
    );
  };

  const handleSelectOneProduct = (
    event: ChangeEvent<HTMLInputElement>,
    productId: string,
  ): void => {
    if (!selectedProducts.includes(productId)) {
      setSelectedProducts(prevSelected => [...prevSelected, productId]);
    } else {
      setSelectedProducts(prevSelected =>
        prevSelected.filter(id => id !== productId),
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  // Usually query is done on backend with indexing solutions
  const filteredProducts = applyFilters(products, query, filters);
  const paginatedProducts = applyPagination(filteredProducts, page, limit);
  const enableBulkOperations = selectedProducts.length > 0;
  const selectedSomeProducts =
    selectedProducts.length > 0 && selectedProducts.length < products.length;
  const selectedAllProducts = selectedProducts.length === products.length;

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box p={2}>
        <Box display="flex" alignItems="center">
          <TextField
            className={classes.queryField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon fontSize="small" color="action">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            onChange={handleQueryChange}
            placeholder="Search products"
            value={query}
            variant="outlined"
          />
          <Box flexGrow={1} />
          <TextField
            label="Sort By"
            name="sort"
            onChange={handleSortChange}
            select
            SelectProps={{ native: true }}
            value={sort}
            variant="outlined"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box mt={3} display="flex" alignItems="center">
          <TextField
            className={classes.categoryField}
            label="Category"
            name="category"
            onChange={handleCategoryChange}
            select
            SelectProps={{ native: true }}
            value={filters.category || 'all'}
            variant="outlined"
          >
            {categoryOptions.map(categoryOption => (
              <option key={categoryOption.id} value={categoryOption.id}>
                {categoryOption.name}
              </option>
            ))}
          </TextField>
          <TextField
            className={classes.availabilityField}
            label="Availability"
            name="availability"
            onChange={handleAvailabilityChange}
            select
            SelectProps={{ native: true }}
            value={filters.availability || 'all'}
            variant="outlined"
          >
            {availabilityOptions.map(avalabilityOption => (
              <option key={avalabilityOption.id} value={avalabilityOption.id}>
                {avalabilityOption.name}
              </option>
            ))}
          </TextField>
          <FormControlLabel
            className={classes.stockField}
            control={
              <Checkbox
                checked={!!filters.inStock}
                onChange={handleStockChange}
                name="inStock"
              />
            }
            label="In Stock"
          />
          <FormControlLabel
            className={classes.shippableField}
            control={
              <Checkbox
                checked={!!filters.isShippable}
                onChange={handleShippableChange}
                name="Shippable"
              />
            }
            label="Shippable"
          />
        </Box>
      </Box>
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllProducts}
              indeterminate={selectedSomeProducts}
              onChange={handleSelectAllProducts}
            />
            <Button variant="outlined" className={classes.bulkAction}>
              Delete
            </Button>
            <Button variant="outlined" className={classes.bulkAction}>
              Edit
            </Button>
          </div>
        </div>
      )}
      <PerfectScrollbar>
        <Box minWidth={1200}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllProducts}
                    indeterminate={selectedSomeProducts}
                    onChange={handleSelectAllProducts}
                  />
                </TableCell>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell>Inventory</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Attributes</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProducts.map(product => {
                const isProductSelected = selectedProducts.includes(product.id);

                return (
                  <TableRow hover key={product.id} selected={isProductSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isProductSelected}
                        onChange={event =>
                          handleSelectOneProduct(event, product.id)
                        }
                        value={isProductSelected}
                      />
                    </TableCell>
                    <TableCell className={classes.imageCell}>
                      {product.image ? (
                        <img
                          alt="Product"
                          src={product.image}
                          className={classes.image}
                        />
                      ) : (
                        <Box p={2} bgcolor="background.dark">
                          <SvgIcon>
                            <ImageIcon />
                          </SvgIcon>
                        </Box>
                      )}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      {getInventoryLabel(product.inventoryType)}
                    </TableCell>
                    <TableCell>
                      {product.quantity} in stock
                      {product.variants > 1 &&
                        ` in ${product.variants} variants`}
                    </TableCell>
                    <TableCell>
                      {product.attributes.map(attr => attr)}
                    </TableCell>
                    <TableCell>
                      {numeral(product.price).format(
                        `${product.currency}0,0.00`,
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton>
                        <SvgIcon fontSize="small">
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredProducts.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

const useStyles = makeStyles(theme => ({
  availabilityField: {
    marginLeft: theme.spacing(2),
    flexBasis: 200,
  },
  bulkOperations: {
    position: 'relative',
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
  },
  bulkAction: {
    marginLeft: theme.spacing(2),
  },
  categoryField: {
    flexBasis: 200,
  },
  imageCell: {
    fontSize: 0,
    width: 68,
    flexBasis: 68,
    flexGrow: 0,
    flexShrink: 0,
  },
  image: {
    height: 68,
    width: 68,
  },
  root: {},
  queryField: {
    width: 500,
  },
  stockField: {
    marginLeft: theme.spacing(2),
  },
  shippableField: {
    marginLeft: theme.spacing(2),
  },
}));

export default Results;
