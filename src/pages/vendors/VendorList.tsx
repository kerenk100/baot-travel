import React, { useEffect, useMemo, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Close as CloseIcon, Save as SaveIcon, Cancel as CancelIcon, Tune } from '@mui/icons-material';
import { Vendor, Deal } from './Types';
import { uwConfig } from '../../components/utilities/uploadWidget/CloudinaryUploadWidget';

const VendorList: React.FC<{initialVendors: Vendor[], onSave: (vendor: Vendor) => Promise<void>, onDelete: (id:string) => Promise<void>}> = 
({initialVendors, onSave, onDelete}) => {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [editingVendorId, setEditingVendorId] = useState<string | null>(null);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentVendorDeals, setCurrentVendorDeals] = useState<Deal[]>([]);
  const [editingDealId, setEditingDealId] = useState<string | null>(null);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [newDeal, setNewDeal] = useState<Deal | null>(null);
  const [currentVendorId, setCurrentVendorId] = useState<string | null>(null);
  useEffect(() => setVendors(initialVendors), [initialVendors]);


  const handleEdit = (vendorId: string) => {
    const vendorToEdit = vendors.find(vendor => vendor._id === vendorId);
    if (vendorToEdit) {
      setEditingVendorId(vendorId);
      setEditingVendor({ ...vendorToEdit });
    }
  };

  const handleSave = () => {
    if (editingVendorId && editingVendor) {
      setVendors(vendors.map(vendor => vendor._id === editingVendorId ? editingVendor : vendor));
      onSave(editingVendor);
      setEditingVendorId(null);
      setEditingVendor(null);
    }
  };

  const handleCancel = () => {
    setEditingVendorId(null);
    setEditingVendor(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingVendor) {
      const { name, value } = e.target;
      setEditingVendor({ ...editingVendor, [name]: value });
    }
  };

  const handleDelete = (vendorId: string) => {
    setVendors(vendors.filter(vendor => vendor._id !== vendorId));
    onDelete(vendorId);
  };

  const handleAddDeals = (vendor: Vendor) => {
    setCurrentVendorDeals([vendor.deal]);
    setCurrentVendorId(vendor._id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDealId(null);
    setEditingDeal(null);
    setNewDeal(null);
  };

  const handleDealEdit = (dealId: string) => {
    const dealToEdit = currentVendorDeals.find(deal => deal._id === dealId);
    if (dealToEdit) {
      setEditingDealId(dealId);
      setEditingDeal({ ...dealToEdit });
    }
  };

  const handleDealSave = () => {
    if (editingDealId && editingDeal) {
      setCurrentVendorDeals(currentVendorDeals.map(deal => deal._id === editingDealId ? editingDeal : deal));
      setEditingDealId(null);
      setEditingDeal(null);
    }
  };

  const handleDealCancel = () => {
    setEditingDealId(null);
    setEditingDeal(null);
  };

  const handleDealInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingDeal) {
      const { name, value } = e.target;
      setEditingDeal({ ...editingDeal, [name]: value });
    } else if (newDeal) {
      const { name, value } = e.target;
      setNewDeal({ ...newDeal, [name]: value });
    }
  };

  const handleDealDelete = (dealId: string) => {
    setCurrentVendorDeals(currentVendorDeals.filter(deal => deal._id !== dealId));
  };

  const handleAddNewDeal = () => {
    if (currentVendorId) {
      const newDealId = `d${Math.random().toString(36).substr(2, 9)}`;
      const newDeal: Deal = {
        _id: newDealId,
        vendorId: currentVendorId,
        description: '',
        link: '',
        startDate: '',
        endDate: '',
      };
      setNewDeal(newDeal);
    }
  };

  const handleNewDealSave = () => {
    if (newDeal) {
      setCurrentVendorDeals([...currentVendorDeals, newDeal]);
      setNewDeal(null);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const hasEditPermission = (vendor: Vendor) => {
    const user = JSON.parse(localStorage.getItem("user")!);
    return user != null && vendor.owner === user.id;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cover Photo</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Website</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor._id}>
              {editingVendorId === vendor._id ? (
                <>
                  <TableCell>
                    {vendor.coverPhoto && (
                      <img
                        src={vendor.coverPhoto}
                        alt={`${vendor.name} cover`}
                        style={{ width: '150px', height: '150px' }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="name"
                      value={editingVendor?.name || ''}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="type"
                      value={editingVendor?.type || ''}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="website"
                      value={editingVendor?.website || ''}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="phoneNumber"
                      value={editingVendor?.phoneNumber || ''}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="email"
                      value={editingVendor?.email || ''}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={handleSave}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={handleCancel}>
                      <CancelIcon />
                    </IconButton>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>
                    {
                      <img
                        src= { vendor.coverPhoto ?
                         (vendor.coverPhoto.startsWith('http') ? vendor.coverPhoto : `https://res.cloudinary.com/${uwConfig.cloudName}/image/upload/${encodeURIComponent(vendor.coverPhoto)}`) :
                         'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'}
                        alt={`${vendor.name} cover`}
                        style={{ height: '100px', width: '150px', borderRadius: '5px' }}
                      />
                    }
                  </TableCell>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.type}</TableCell>
                  <TableCell>
                    <a href={vendor.website} target="_blank" rel="noopener noreferrer">
                      {vendor.website}
                    </a>
                  </TableCell>
                  <TableCell>{vendor.phoneNumber}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>
                    {hasEditPermission(vendor) && <IconButton onClick={() => handleEdit(vendor._id)}>
                      <EditIcon />
                    </IconButton>}
                    {hasEditPermission(vendor) && <IconButton onClick={() => handleDelete(vendor._id)}>
                      <DeleteIcon />
                    </IconButton>}
                    <IconButton onClick={() => handleAddDeals(vendor)}>
                      <Button variant="text">Vendor deals</Button>
                    </IconButton>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>Vendor Deals</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Link</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentVendorDeals.map((deal) => (
                  <TableRow key={deal._id}>
                    {editingDealId === deal._id ? (
                      <>
                        <TableCell>
                          <TextField
                            name="description"
                            value={editingDeal?.description || ''}
                            onChange={handleDealInputChange}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="link"
                            value={editingDeal?.link || ''}
                            onChange={handleDealInputChange}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="startDate"
                            value={editingDeal?.startDate || ''}
                            onChange={handleDealInputChange}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="endDate"
                            value={editingDeal?.endDate || ''}
                            onChange={handleDealInputChange}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={handleDealSave}>
                            <SaveIcon />
                          </IconButton>
                          <IconButton onClick={handleDealCancel}>
                            <CancelIcon />
                          </IconButton>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{deal.description}</TableCell>
                        <TableCell><a href={deal.link} target="_blank" rel="noopener noreferrer">{deal.link}</a></TableCell>
                        <TableCell>{deal.startDate}</TableCell>
                        <TableCell>{deal.endDate}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleDealEdit(deal._id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDealDelete(deal._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
                {newDeal && (
                  <TableRow>
                    <TableCell>
                      <TextField
                        name="description"
                        value={newDeal.description}
                        onChange={handleDealInputChange}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="link"
                        value={newDeal.link}
                        onChange={handleDealInputChange}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="startDate"
                        value={newDeal.startDate}
                        onChange={handleDealInputChange}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="endDate"
                        value={newDeal.endDate}
                        onChange={handleDealInputChange}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={handleNewDealSave}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={() => setNewDeal(null)}>
                        <CancelIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddNewDeal}
          >
            Add New Deal
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={selectedDeal ? `${selectedDeal.description}: ${selectedDeal.link}` : ''}
        action={
          <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </TableContainer>
  );
};

export default VendorList;