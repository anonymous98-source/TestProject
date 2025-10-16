// components/ApprovalTable.jsx
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { formatTimestampToDate } from "../../../utils/dateUtils"; // keep/adjust path

function AvatarCell({ name }) {
  const safe = (name ?? "").toString().trim() || "U";
  const initials = safe
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        bgcolor: "primary.light",
        color: "primary.contrastText",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        mr: 1,
      }}
    >
      {initials}
    </Box>
  );
}

export default function ApprovalTable({
  rows = [],
  loading = false,
  onSelectionChange,
  onViewDetails,
  onApprove,
  onReject,
}) {
  const columns = [
    {
      field: "REQUEST_ID",
      headerName: "Request ID",
      flex: 0.9,
      sortable: true,
      valueGetter: (p) => p.row?.REQUEST_ID ?? "",
    },
    {
      field: "__name",
      headerName: "Name",
      flex: 1.2,
      sortable: true,
      valueGetter: (p) => p.row?.__name ?? "",
      renderCell: (params) => (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ height: "100%" }}
        >
          <AvatarCell name={params.row?.__name} />
          <Stack
            direction="column"
            justifyContent="center"
            spacing={0}
            sx={{ lineHeight: 1 }}
          >
            <Typography
              fontWeight={600}
              variant="body2"
              sx={{ lineHeight: 1.2 }}
            >
              {params.row?.__name ?? ""}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ lineHeight: 1.2 }}
            >
              {params.row?.USERID ?? ""}
            </Typography>
          </Stack>
        </Stack>
      ),
    },
    {
      field: "REQUEST_TYPE",
      headerName: "Type",
      flex: 0.7,
      sortable: true,
      valueGetter: (p) => p.row?.requestorUserId ?? "",
    },
    {
      field: "EMAIL",
      headerName: "Email",
      flex: 1.2,
      sortable: true,
      valueGetter: (p) => p.row?.EMAIL ?? "",
    },
    {
      field: "ROLE_NAME",
      headerName: "Role",
      flex: 0.8,
      sortable: true,
      valueGetter: (p) => p.row?.ROLE_NAME ?? "",
    },
    {
      field: "BRANCH",
      headerName: "Branch",
      flex: 0.7,
      sortable: true,
      align: "right",
      headerAlign: "right",
      valueGetter: (p) => p.row?.BRANCH ?? "",
    },
    {
      field: "REQUESTED_AT",
      headerName: "Requested At",
      flex: 1,
      sortable: true,
      valueGetter: (p) => p.row?.requestDate ?? "",
      valueFormatter: (p) => formatTimestampToDate(p.value),
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      flex: 0.9,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%" }}
        >
          <Tooltip title="View details">
            <span>
              <IconButton
                size="small"
                onClick={() => onViewDetails?.(params.row)}
              >
                <VisibilityIcon fontSize="inherit" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Approve">
            <IconButton
              size="small"
              color="success"
              onClick={() => onApprove?.(params.row)}
            >
              <CheckIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reject">
            <IconButton
              size="small"
              color="error"
              onClick={() => onReject?.(params.row)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      // Guarantees a stable id even if your normalizer misses `id`
      getRowId={(row) =>
        row.id ??
        row.REQUEST_ID ??
        `${row.USERID ?? "unknown"}-${row.REQUEST_TYPE ?? "TYPE"}-${
          row.REQUESTED_AT ?? "NA"
        }`
      }
      checkboxSelection
      disableRowSelectionOnClick
      onRowSelectionModelChange={(model) => onSelectionChange?.(model)}
      pageSizeOptions={[5, 10, 25, 50]}
      loading={loading}
      autoHeight
      initialState={{
        pagination: { paginationModel: { pageSize: 10, page: 0 } },
        sorting: { sortModel: [{ field: "REQUESTED_AT", sort: "desc" }] },
      }}
    />
  );
}


{
    "statusCode": "OK",
    "message": "OK",
    "result": {
        "pendingRequests": [
            {
                "requestId": 21,
                "requestType": "MODIFY",
                "requestorUserId": "1017860",
                "targetUserId": "1015698",
                "requestPayload": "{\"userId\":\"1015698\",\"firstName\":\"Rehaman\",\"lastName\":\"Shaik\",\"email\":\"rrr@rajmoli.com\",\"phoneNumber\":\"0000000000\",\"roleName\":\"UCO\",\"roleId\":51}",
                "requestStatus": "PENDING",
                "requestDate": "2025-10-15T07:38:15.633+00:00",
                "approvalDate": null,
                "approverUserId": null,
                "reasonForRejection": null,
                "executionDate": null,
                "executionDetails": null
            }
        ],
        "message": "1 pending requests found for user",
        "status": true
    },
    "timestamp": null
}
