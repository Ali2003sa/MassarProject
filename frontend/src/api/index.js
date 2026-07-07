// src/api/index.js - Frontend-only demo API
import { DEMO_USERS, DEMO_WILAYAS } from '../mocks/demoData';

const STORAGE_KEY = 'tyrechain_demo_state_v1';
const LATENCY = 180;

const clone = value => JSON.parse(JSON.stringify(value));
const response = data => new Promise(resolve => setTimeout(() => resolve({ data: clone(data) }), LATENCY));
const nowIso = () => new Date().toISOString().slice(0, 10);

function getWilaya(code) {
  return DEMO_WILAYAS.find(w => String(w.code) === String(code)) || { code: String(code), name: `Wilaya ${code}` };
}

const seedTyreTypes = [
  ['TYR-CONT-19565-001', 'Continental', '195/65 R15', 520, 360],
  ['TYR-CONT-22555-002', 'Continental', '225/55 R16', 430, 250],
  ['TYR-CONT-23560-003', 'Continental', '235/60 R18 103V FR UC', 210, 120],
  ['TYR-IRIS-20555-004', 'Iris', '205/55R 16', 620, 410],
  ['TYR-IRIS-19575-005', 'Iris', '195/75 R16 C 107/105 S', 360, 180],
  ['TYR-IRIS-22565-006', 'Iris', '225/65 R16 C 112/110S', 275, 150],
  ['TYR-SEMP-20565-007', 'Semperit', '205/65 R15', 310, 165],
  ['TYR-SEMP-21575-008', 'Semperit', '215/75R16C 116/114R V-L3', 190, 80],
  ['TYR-SEMP-23545-009', 'Semperit', '235/45R17 94Y FR S-L3', 145, 50],
  ['TYR-CONT-17565-010', 'Continental', '175/65 R14', 480, 320],
  ['TYR-IRIS-18565-011', 'Iris', '185/65R15', 540, 360],
  ['TYR-SEMP-15580-012', 'Semperit', '155/80 R13 79T C-L2', 260, 115],
].map(([ID, Brand, Model, TotalQty, CentralQty], index) => ({
  ID,
  Brand,
  Model,
  TotalQty,
  CentralQty,
  CreatedAt: `2026-0${(index % 6) + 1}-${String((index % 24) + 1).padStart(2, '0')}`,
}));

const seedGasStations = [
  ['GS-ALG-001', 'NAFTAL Hydra Service Station', '16', 'Hydra, Algiers', 'hydra.station'],
  ['GS-ALG-002', 'NAFTAL Bab Ezzouar', '16', 'Bab Ezzouar, Algiers', 'babez.station'],
  ['GS-ORN-001', 'NAFTAL Es Senia', '31', 'Es Senia, Oran', 'essenia.station'],
  ['GS-ORN-002', 'NAFTAL Bir El Djir', '31', 'Bir El Djir, Oran', 'birdjir.station'],
  ['GS-STF-001', 'NAFTAL Setif Centre', '19', 'Setif city centre', 'setif.station'],
  ['GS-CST-001', 'NAFTAL Constantine Plateau', '25', 'Plateau, Constantine', 'constantine.station'],
  ['GS-BJA-001', 'NAFTAL Bejaia Port', '06', 'Port road, Bejaia', 'bejaia.station'],
  ['GS-BLD-001', 'NAFTAL Blida Chiffa', '09', 'Chiffa, Blida', 'blida.station'],
].map(([id, name, wilayaCode, address, username]) => {
  const wilaya = getWilaya(wilayaCode);
  return { id, name, wilayaCode, wilayaName: wilaya.name, address, username };
});

const batchSeed = [
  ['BATCH_B20260701001', 'TYR-CONT-19565-001', 'Continental', '195/65 R15', 90, 'IN_TRANSIT_WILAYA', '16', null, 0],
  ['BATCH_B20260628002', 'TYR-IRIS-20555-004', 'Iris', '205/55R 16', 120, 'AT_WILAYA_DEPOT', '16', null, 0],
  ['BATCH_B20260626003', 'TYR-SEMP-20565-007', 'Semperit', '205/65 R15', 75, 'IN_TRANSIT_GAS_STATION', '16', 'GS-ALG-001', 0],
  ['BATCH_B20260622004', 'TYR-CONT-22555-002', 'Continental', '225/55 R16', 60, 'AT_GAS_STATION', '16', 'GS-ALG-001', 0],
  ['BATCH_B20260616005', 'TYR-IRIS-18565-011', 'Iris', '185/65R15', 42, 'SOLD', '16', 'GS-ALG-001', 42],
  ['BATCH_B20260614006', 'TYR-SEMP-21575-008', 'Semperit', '215/75R16C 116/114R V-L3', 55, 'AT_GAS_STATION', '16', 'GS-ALG-002', 8],
  ['BATCH_B20260612007', 'TYR-CONT-17565-010', 'Continental', '175/65 R14', 110, 'AT_WILAYA_DEPOT', '31', null, 0],
  ['BATCH_B20260611008', 'TYR-IRIS-19575-005', 'Iris', '195/75 R16 C 107/105 S', 70, 'AT_GAS_STATION', '31', 'GS-ORN-001', 15],
  ['BATCH_B20260609009', 'TYR-CONT-23560-003', 'Continental', '235/60 R18 103V FR UC', 40, 'IN_TRANSIT_WILAYA', '19', null, 0],
  ['BATCH_B20260607010', 'TYR-SEMP-15580-012', 'Semperit', '155/80 R13 79T C-L2', 65, 'AT_GAS_STATION', '25', 'GS-CST-001', 11],
  ['BATCH_B20260605011', 'TYR-IRIS-22565-006', 'Iris', '225/65 R16 C 112/110S', 50, 'AT_WILAYA_DEPOT', '06', null, 0],
  ['BATCH_B20260601012', 'TYR-SEMP-23545-009', 'Semperit', '235/45R17 94Y FR S-L3', 24, 'EXPIRED_WILAYA', '09', null, 0],
];

function buildBatch([ID, TyreTypeID, Brand, Model, Quantity, Status, WilayaCode, GasStationID, SoldQuantity], index) {
  const wilaya = getWilaya(WilayaCode);
  const station = GasStationID ? seedGasStations.find(s => s.id === GasStationID) : null;
  return {
    ID,
    TyreTypeID,
    Brand,
    Model,
    Quantity,
    SoldQuantity,
    Status,
    WilayaCode,
    WilayaName: wilaya.name,
    GasStationID,
    GasStationName: station?.name || '',
    Owner: Status === 'AT_GAS_STATION' || Status === 'SOLD' ? 'Gas Station' : Status === 'AT_WILAYA_DEPOT' ? 'Regional Depot' : 'Central Depot',
    Location: station?.name || wilaya.name,
    SentAt: `2026-06-${String(Math.max(1, 28 - index * 2)).padStart(2, '0')}`,
    SentToGasAt: station ? `2026-06-${String(Math.max(1, 30 - index * 2)).padStart(2, '0')}` : '',
    ExpiredReason: Status === 'EXPIRED_WILAYA' ? 'Arrival confirmation deadline exceeded in demo monitoring.' : '',
  };
}

function initialUsers() {
  return [
    { ...DEMO_USERS.central, id: 'U-CENTRAL-001', active: true, phone: '+213 21 00 10 10' },
    { ...DEMO_USERS.regional, id: 'U-REG-001', active: true, phone: '+213 21 00 20 20' },
    { ...DEMO_USERS.gas, id: 'U-GAS-001', active: true, phone: '+213 21 00 30 30' },
    { id: 'U-REG-031', username: 'oran.manager', role: 2, org: 'regional', firstName: 'Amine', lastName: 'Boudiaf', email: 'amine.boudiaf@naftal.dz', phone: '+213 41 54 11 20', position: 'Oran depot manager', wilayaCode: '31', active: true },
    { id: 'U-GAS-031', username: 'essenia.operator', role: 3, org: 'gas', firstName: 'Samira', lastName: 'Kaci', email: 'samira.kaci@naftal.dz', phone: '+213 41 60 44 33', position: 'Station operator', wilayaCode: '31', gasStationId: 'GS-ORN-001', active: true },
  ];
}

function initialState() {
  return {
    tyreTypes: seedTyreTypes,
    batches: batchSeed.map(buildBatch),
    wilayas: DEMO_WILAYAS,
    gasStations: seedGasStations,
    users: initialUsers(),
    sales: [],
  };
}

function readState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : persist(initialState());
  } catch {
    return persist(initialState());
  }
}

function persist(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
}

function currentUser() {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    return null;
  }
}

function stationById(state, id) {
  return state.gasStations.find(s => String(s.id) === String(id));
}

function batchId(id) {
  return String(id).startsWith('BATCH_') ? String(id) : `BATCH_${id}`;
}

function setBatchStatus(id, updater) {
  const state = readState();
  const idFull = batchId(id);
  const batch = state.batches.find(b => b.ID === idFull);
  if (!batch) throw new Error('Batch not found.');
  updater(batch, state);
  persist(state);
  return response(batch);
}

export const loginAsRole = role => {
  const user = clone(DEMO_USERS[role] || DEMO_USERS.central);
  localStorage.setItem('demoSession', `demo-${role}-session`);
  localStorage.setItem('user', JSON.stringify(user));
  return response({ demoSession: `demo-${role}-session`, user });
};

export const login = () => loginAsRole('central');
export const getMe = () => response(currentUser());

export const getUsers = () => response(readState().users);
export const createUser = data => {
  const state = readState();
  const user = {
    ...data,
    id: `U-${Date.now()}`,
    username: data.username || `demo.user.${state.users.length + 1}`,
    active: true,
  };
  state.users.unshift(user);
  persist(state);
  return response(user);
};
export const updateUser = (username, data) => {
  const state = readState();
  state.users = state.users.map(u => u.username === username ? { ...u, ...data } : u);
  persist(state);
  return response(state.users.find(u => u.username === username));
};
export const deleteUser = username => {
  const state = readState();
  state.users = state.users.map(u => u.username === username ? { ...u, active: false } : u);
  persist(state);
  return response({ ok: true });
};

export const getAllWilayas = () => response(readState().wilayas);
export const getWilayas = getAllWilayas;
export const getGasStationsByWilaya = code => response(readState().gasStations.filter(s => String(s.wilayaCode) === String(code)));

export const getAllGasStations = () => response(readState().gasStations);
export const getGasStations = getAllGasStations;
export const addGasStation = data => {
  const state = readState();
  const wilaya = getWilaya(data.wilayaCode);
  const station = {
    id: `GS-${String(data.wilayaCode || '00').padStart(2, '0')}-${Date.now().toString().slice(-4)}`,
    name: data.name,
    wilayaCode: data.wilayaCode,
    wilayaName: wilaya.name,
    address: data.address || 'NAFTAL service road',
    username: data.username || `${String(data.name || 'station').toLowerCase().replace(/\s+/g, '.')}.operator`,
  };
  state.gasStations.unshift(station);
  persist(state);
  return response(station);
};
export const deleteGasStation = id => {
  const state = readState();
  state.gasStations = state.gasStations.filter(s => String(s.id) !== String(id));
  persist(state);
  return response({ ok: true });
};
export const removeGasStation = deleteGasStation;

export const getAllTyreTypes = () => response(readState().tyreTypes);
export const getTyreTypes = getAllTyreTypes;
export const createTyreType = data => {
  const state = readState();
  const qty = Number(data.quantity || 0);
  const tyre = {
    ID: data.id,
    Brand: data.brand,
    Model: data.model,
    TotalQty: qty,
    CentralQty: qty,
    CreatedAt: nowIso(),
  };
  state.tyreTypes.unshift(tyre);
  persist(state);
  return response(tyre);
};

export const getAllBatches = () => response(readState().batches);
export const getMyWilayaBatches = () => {
  const state = readState();
  const user = currentUser();
  const code = user?.wilaya?.code || user?.wilayaCode || '16';
  return response(state.batches.filter(b => String(b.WilayaCode) === String(code)));
};
export const getMyStationBatches = () => {
  const state = readState();
  const user = currentUser();
  const stationId = user?.gasStation?.id || user?.gasStationId || 'GS-ALG-001';
  return response(state.batches.filter(b => String(b.GasStationID) === String(stationId)));
};
export const getAllWilayasBatches = () => response(readState().batches);
export const getBatchHistory = id => {
  const batch = readState().batches.find(b => b.ID === batchId(id));
  if (!batch) return response([]);
  const rows = [
    { Status: 'CREATED', Quantity: batch.Quantity + (batch.SoldQuantity || 0), Owner: 'Central Depot' },
    { Status: 'IN_TRANSIT_WILAYA', Quantity: batch.Quantity + (batch.SoldQuantity || 0), WilayaName: batch.WilayaName, Owner: 'Central Depot' },
  ];
  if (['AT_WILAYA_DEPOT', 'IN_TRANSIT_GAS_STATION', 'AT_GAS_STATION', 'SOLD'].includes(batch.Status)) {
    rows.push({ Status: 'AT_WILAYA_DEPOT', Quantity: batch.Quantity + (batch.SoldQuantity || 0), WilayaName: batch.WilayaName, Owner: 'Regional Depot' });
  }
  if (['IN_TRANSIT_GAS_STATION', 'AT_GAS_STATION', 'SOLD'].includes(batch.Status)) {
    rows.push({ Status: 'IN_TRANSIT_GAS_STATION', Quantity: batch.Quantity + (batch.SoldQuantity || 0), GasStationName: batch.GasStationName, Owner: 'Regional Depot' });
  }
  if (['AT_GAS_STATION', 'SOLD'].includes(batch.Status)) {
    rows.push({ Status: 'AT_GAS_STATION', Quantity: batch.Quantity + (batch.SoldQuantity || 0), GasStationName: batch.GasStationName, Owner: 'Gas Station' });
  }
  if (batch.Status === 'SOLD' || batch.SoldQuantity > 0) {
    rows.push({ Status: 'SOLD', Quantity: batch.SoldQuantity, GasStationName: batch.GasStationName, Owner: 'Client' });
  }
  return response(rows);
};

export const sendBatchToWilaya = data => {
  const state = readState();
  const tyre = state.tyreTypes.find(t => t.ID === data.tyreTypeID);
  if (!tyre) throw new Error('Tyre type not found.');
  const qty = Number(data.quantity || 0);
  tyre.CentralQty = Math.max(0, Number(tyre.CentralQty || 0) - qty);
  const wilaya = getWilaya(data.wilayaCode);
  const batch = {
    ID: batchId(data.batchID || `B${Date.now()}`),
    TyreTypeID: tyre.ID,
    Brand: tyre.Brand,
    Model: tyre.Model,
    Quantity: qty,
    SoldQuantity: 0,
    Status: 'IN_TRANSIT_WILAYA',
    WilayaCode: data.wilayaCode,
    WilayaName: wilaya.name,
    GasStationID: null,
    GasStationName: '',
    Owner: 'Central Depot',
    Location: `In transit to ${wilaya.name}`,
    SentAt: nowIso(),
    SentToGasAt: '',
  };
  state.batches.unshift(batch);
  persist(state);
  return response(batch);
};

export const confirmArrivalWilaya = id => setBatchStatus(id, batch => {
  batch.Status = 'AT_WILAYA_DEPOT';
  batch.Owner = 'Regional Depot';
  batch.Location = batch.WilayaName;
});

export const sendBatchToGas = (id, data) => setBatchStatus(id, (batch, state) => {
  const station = stationById(state, data.stationId);
  const qty = Math.min(Number(data.quantity || batch.Quantity), batch.Quantity);
  batch.Quantity = qty;
  batch.Status = 'IN_TRANSIT_GAS_STATION';
  batch.GasStationID = station?.id || data.stationId;
  batch.GasStationName = station?.name || 'Selected gas station';
  batch.Owner = 'Regional Depot';
  batch.Location = `In transit to ${batch.GasStationName}`;
  batch.SentToGasAt = nowIso();
});

export const confirmArrivalGas = id => setBatchStatus(id, batch => {
  batch.Status = 'AT_GAS_STATION';
  batch.Owner = 'Gas Station';
  batch.Location = batch.GasStationName;
});

export const sellBatch = (id, data) => setBatchStatus(id, (batch, state) => {
  const qty = Math.min(Number(data.quantity || 1), batch.Quantity);
  batch.Quantity = Math.max(0, batch.Quantity - qty);
  batch.SoldQuantity = Number(batch.SoldQuantity || 0) + qty;
  if (batch.Quantity === 0) batch.Status = 'SOLD';
  state.sales.unshift({
    id: `SALE-${Date.now()}`,
    batchId: batch.ID,
    client: data.client,
    vehicleCard: data.vehicleCard,
    quantity: qty,
    soldAt: nowIso(),
    station: batch.GasStationName,
  });
});

export const checkClientEligibility = vehicleCard => {
  const lastDigit = Number(String(vehicleCard).replace(/\D/g, '').slice(-1));
  if (!Number.isNaN(lastDigit) && lastDigit % 5 === 0) {
    return response({
      eligible: false,
      lastPurchase: '2026-06-20',
      daysRemaining: 12,
      eligibleFrom: '2026-07-19',
    });
  }
  return response({ eligible: true, lastPurchase: null, daysRemaining: 0, eligibleFrom: nowIso() });
};
export const getClientRecord = vehicleCard => response({ vehicleCard, purchases: [] });
export const getAllSales = () => response(readState().sales);
