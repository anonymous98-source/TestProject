// components/RequestDetailsDialog.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";

function Row({ label, value }) {
  return (
    <Stack direction="row" spacing={1}>
      <Typography sx={{ minWidth: 140 }} color="text.secondary">
        {label}
      </Typography>
      <Typography sx={{ wordBreak: "break-word" }}>{value ?? "-"}</Typography>
    </Stack>
  );
}

export default function RequestDetailsDialog({ open, row, onClose }) {
  const { callApi, loading, error: apiError } = useApi();
  const [oldUserData, setOldUserData] = useState(null);

  useEffect(() => {
    if (row?.USERID && row?.ROLE_ID) {
      getUserPreviousDetails(row.USERID, row.BRANCH, row.ROLE_ID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row]);

  // ✅ Completed & Optimized Function
  const getUserPreviousDetails = async (userId, reqBranch, reqRole) => {
    try {
      const params = new URLSearchParams({
        id: userId,
        branch: reqBranch || "",
        roleId: reqRole,
      });

      const data = await callApi(`/UM/user/user-details?${params}`, {}, "GET");

      if (data?.result?.users?.length > 0) {
        setOldUserData(data.result.users[0]);
      } else {
        setOldUserData(null);
      }
    } catch (err) {
      console.error("Error fetching previous user details:", err);
      setOldUserData(null);
    }
  };

  const renderOldUserData = () => {
    if (loading) return <CircularProgress size={24} />;
    if (apiError) return <Typography color="error">Failed to load old user data</Typography>;
    if (!oldUserData) return <Typography>No previous user data found.</Typography>;

    return (
      <Stack spacing={1}>
        <Row label="First Name" value={oldUserData.FIRST_NAME} />
        <Row label="Last Name" value={oldUserData.LAST_NAME} />
        <Row label="User ID" value={oldUserData.USERID} />
        <Row label="Email" value={oldUserData.EMAIL} />
        <Row label="Phone" value={oldUserData.PHONE_NUMBER} />
        <Row label="Role" value={`${oldUserData.ROLE_NAME} (${oldUserData.ROLE_ID})`} />
        <Row label="Branch" value={oldUserData.BRANCH} />
        <Row label="Account Status" value={oldUserData.ACCOUNT_STATUS} />
      </Stack>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Request Details</DialogTitle>
      <DialogContent>
        <Stack spacing={1.25} sx={{ mt: 0.5 }}>
          <Row label="Request ID" value={row?.REQUEST_ID} />
          <Row label="Type" value={row?.REQUEST_TYPE} />
          <Row label="Status" value={row?.STATUS} />
          <Divider sx={{ my: 1 }} />
          <Row
            label="User"
            value={`${row?.__name ?? ""} (${row?.USERID ?? ""})`}
          />
          <Row label="Email" value={row?.EMAIL} />
          <Row label="Phone" value={row?.PHONE_NUMBER} />
          <Row
            label="Role"
            value={`${row?.ROLE_NAME ?? ""} (${row?.ROLE_ID ?? ""})`}
          />
          <Row label="Branch" value={row?.BRANCH} />
          <Divider sx={{ my: 1 }} />
          <Row label="Requested At" value={row?.REQUESTED_AT} />
          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Old User Data
          </Typography>
          {renderOldUserData()}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}