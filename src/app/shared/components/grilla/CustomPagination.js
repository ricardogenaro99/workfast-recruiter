import Pagination from "@mui/material/Pagination";
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from "@mui/x-data-grid";
import * as React from "react";

export const CustomPagination = () => {
	const apiRef = useGridApiContext();
	const page = useGridSelector(apiRef, gridPageSelector);
	const pageCount = useGridSelector(apiRef, gridPageCountSelector);

	return (
		<Pagination
			color="primary"
			count={pageCount}
			page={page + 1}
			onChange={(event, value) => apiRef.current.setPage(value - 1)}
		/>
	);
};
