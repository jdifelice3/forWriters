import { useState } from "react"
import { Box, CircularProgress, Typography, Button, MenuItem, Select, FormControl, InputLabel, Switch, FormControlLabel } from "@mui/material"
import { DiffResponse } from "../types/Diff";
import { AppFileMeta } from "../types/domain-types";
import { DiffSummary } from "../components/diff/DiffSummary"
import { DiffBlockList } from "../components/diff/DiffBlockList"
import { RevisionTrendChart } from "../components/diff/RevisionTrendChart"
import { useParams } from "react-router-dom";
import { useFileDiffDomain } from "../hooks/file/useFileDiffDomain";
import { useFiles } from "../hooks/file/useFiles";
import { RevisionDistribution } from "../components/diff/RevisionDistribution"

export const VersionCompare = () => {
    const { appFileMetaId } = useParams<{ appFileMetaId: string }>();
    const { files } = useFiles();
    const appFileMeta: AppFileMeta | undefined = files.find(f => f.id === appFileMetaId);
    const { compareVersions } = useFileDiffDomain(appFileMetaId);

  const [fromVersion, setFromVersion] = useState<number | "">("")
  const [toVersion, setToVersion] = useState<number | "">("")
  const [diff, setDiff] = useState<DiffResponse | null>(null)
  const [showUnchanged, setShowUnchanged] = useState(false)
  const [loading, setLoading] = useState(false)

      if( !appFileMeta) return;
      
  const handleCompare = async () => {
    if (!fromVersion || !toVersion) return
    if(fromVersion === toVersion){
        alert("You must compare different manuscript versions")
        return;
    }
    setLoading(true)
    const data = await compareVersions(fromVersion, toVersion);
    console.log('data', data)
    setDiff(data)
    setLoading(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
            <Typography variant="h4" mb={2} mt={4} ml={2}>
          {/* <MenuBookIcon
            sx={{ fontSize: "44px", verticalAlign: "bottom" }}
          />{" "} */}
          Manuscript Version Comparison Tool
        </Typography>
    {/* <Box sx={{ py: 10, textAlign: "center", color: "text.secondary" }}> */}
          <Typography variant="h6" sx={{ mb: 1, ml: 2 }}>
            Select two versions to compare
          </Typography>
        {/* </Box> */}
    <Box sx={{mt: 4, ml: 2}}>
      {/* Top Controls */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 4, ml:2 }}>
        <FormControl size="small">
          <InputLabel>From</InputLabel>
          <Select sx={{width: 300}}
            value={fromVersion}
            label="From"
            onChange={(e) => setFromVersion(e.target.value as number)}
          >
            {appFileMeta.appFile.map((v) => (
              <MenuItem key={v.version} value={v.version}>
                {v.filename.replace(/^\d+-/, '')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>To</InputLabel>
          <Select sx={{width: 300}}
            value={toVersion}
            label="To"
            onChange={(e) => setToVersion(e.target.value as number)}
          >
            {appFileMeta.appFile.map((v) => (
              <MenuItem key={v.version} value={v.version}>
                {v.filename.replace(/^\d+-/, '')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleCompare}
          disabled={!fromVersion || !toVersion || loading}
        >
           {loading ? "Comparing..." : "Compare"}
        </Button>

        {diff && (
          <FormControlLabel
            control={
              <Switch
                checked={showUnchanged}
                onChange={(e) => setShowUnchanged(e.target.checked)}
              />
            }
            label="Show Unchanged"
          />
        )}
      </Box>

      {/* Empty State */}
      {/* {!diff && (
        <Box sx={{ py: 10, textAlign: "center", color: "text.secondary" }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Select two versions to compare
          </Typography>
          <Typography variant="body2">
            Choose a "From" and "To" version above, then click Compare.
          </Typography>
        </Box>
      )} */}

      {/* Results */}

      {diff && (
        <>
         <Typography variant="h6" fontWeight={600} mb={2}>
            Revision Changes            
        </Typography>
        <RevisionTrendChart diff={diff} />

        <Typography variant="h6" fontWeight={600} mb={0.5}>
            Revision Distribution
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Where the manuscript changed most.
        </Typography>
        <RevisionDistribution blocks={diff.blocks} />

        <DiffSummary diff={diff} />
        <Box
            id="diff-container"
            sx={{
                maxHeight: "70vh",
                overflowY: "auto",
                scrollBehavior: "smooth"
            }}
        >
            <DiffBlockList
                blocks={diff.blocks}
                showUnchanged={showUnchanged}
            />
        </Box>
        </>
      )}

      
    </Box>
    {loading && (
  <Box sx={{ textAlign: "center", py: 6 }}>
    <CircularProgress />
  </Box>
)}
    </>
  )
}