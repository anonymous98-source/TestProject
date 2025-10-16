{
    "statusCode": "OK",
    "message": "OK",
    "result": {
        "message": "1 users found ",
        "users": [
            {
                "LAST_NAME": "Shaik",
                "BRANCH": 12345,
                "ROLE_ID": 51,
                "ROLE_NAME": "UCO",
                "ACCOUNT_STATUS": "ACTIVE",
                "PHONE_NUMBER": "0000000000",
                "USERID": "1015698",
                "FIRST_NAME": "Rehaman",
                "EMAIL": "ttr@sbi.co.in"
            }
        ],
        "status": true
    },
    "timestamp": null
}


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
} from "@mui/material";
import { useEffect } from "react";
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
  useEffect(() => {
    console.log(row); //BRANCH,USERID,ROLE_ID
    getUserPreviousDetails(row?.USERID, row?.BRANCH, row?.ROLE_ID);
  }, [row]);

  const getUserPreviousDetails = async (userId, reqBranch, reqRole) => {
    let payload = {
      id: userId,
      branch: reqBranch,
      roleId: reqRole,
    };

    const data = await callApi("/UM/user/user-details", payload, "GET");
    
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
          <Row
            label="Raw"
            value={row?._raw ? JSON.stringify(row._raw, null, 2) : "-"}
          />
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

https://localhost:1000/UM/user/user-details?id=1015698&branch=&roleId=51
