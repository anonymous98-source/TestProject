// components/ApprovalTable.jsx
import {
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { formatTimestampToDate } from "../../../utils/dateUtils";

function AvatarCell({ name }) {
  const initials =
    (name ?? "")
      .trim()
      .split(/\s+/)
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

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

// ✅ Normalizes backend data → clean grid rows (excluding raw payload)
function normalizePendingRequests(apiResponse) {
  const pendingRequests = apiResponse?.result?.pendingRequests ?? [];

  return pendingRequests.map((req) => {
    let payload = {};
    try {
      payload = JSON.parse(req.requestPayload || "{}");
    } catch {
      console.warn("Invalid requestPayload JSON:", req.requestPayload);
    }

    const fullName = `${payload.firstName ?? ""} ${payload.lastName ?? ""}`.trim();

    return {
      id: req.requestId,
      REQUEST_ID: req.requestId,
      REQUEST_TYPE: req.requestType,
      REQUEST_STATUS: req.requestStatus,
      REQUESTED_AT: req.requestDate,
      REQUESTOR_USER_ID: req.requestorUserId,
      TARGET_USER_ID: req.targetUserId,
      __name: fullName || "-",
      USERID: payload.userId ?? req.targetUserId,
      EMAIL: payload.email ?? "-",
      PHONE_NUMBER: payload.phoneNumber ?? "-",
      ROLE_NAME: payload.roleName ?? "-",
      ROLE_ID: payload.roleId ?? "-",
      BRANCH: payload.branch ?? "-",
      // keep raw request (excluding payload) for "View Details"
      _raw: { ...req, requestPayload: undefined },
    };
  });
}

export default function ApprovalTable({
  responseData = null,
  loading = false,
  onSelectionChange,
  onViewDetails,
  onApprove,
  onReject,
}) {
  const rows = normalizePendingRequests(responseData);

  const columns = [
    {
      field: "REQUEST_ID",
      headerName: "Request ID",
      flex: 0.7,
      sortable: true,
    },
    {
      field: "__name",
      headerName: "User",
      flex: 1.5,
      sortable: true,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <AvatarCell name={params.row.__name} />
          <Stack spacing={0}>
            <Typography fontWeight={600} variant="body2">
              {params.row.__name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.USERID}
            </Typography>
          </Stack>
        </Stack>
      ),
    },
    {
      field: "REQUEST_TYPE",
      headerName: "Type",
      flex: 0.8,
      sortable: true,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color="info"
          size="small"
          sx={{ fontWeight: 600 }}
        />
      ),
    },
    {
      field: "EMAIL",
      headerName: "Email",
      flex: 1.4,
      sortable: true,
    },
    {
      field: "ROLE_NAME",
      headerName: "Role",
      flex: 0.9,
      sortable: true,
    },
    {
      field: "BRANCH",
      headerName: "Branch",
      flex: 0.8,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "REQUESTED_AT",
      headerName: "Requested At",
      flex: 1,
      sortable: true,
      valueFormatter: (p) =>
        p.value ? formatTimestampToDate(p.value) : "-",
    },
    {
      field: "REQUEST_STATUS",
      headerName: "Status",
      flex: 0.9,
      renderCell: (params) => {
        const status = params.value ?? "UNKNOWN";
        const color =
          status === "PENDING"
            ? "warning"
            : status === "APPROVED"
            ? "success"
            : status === "REJECTED"
            ? "error"
            : "default";
        return (
          <Chip
            label={status}
            color={color}
            size="small"
            sx={{ fontWeight: 600 }}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Tooltip title="View Details">
            <IconButton
              size="small"
              onClick={() => onViewDetails?.(params.row)}
            >
              <VisibilityIcon fontSize="inherit" />
            </IconButton>
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
      getRowId={(row) => row.id}
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