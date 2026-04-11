import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Teams
app.get('/api/teams', async (req, res) => {
  const teams = await prisma.team.findMany();
  res.json(teams);
});

// Salespeople
app.get('/api/salespeople', async (req, res) => {
  const salespeople = await prisma.salesPerson.findMany();
  res.json(salespeople);
});

// Deals
app.get('/api/deals', async (req, res) => {
  const deals = await prisma.deal.findMany();
  // Parse stageProgress back to object
  const parsedDeals = deals.map(deal => ({
    ...deal,
    stageProgress: JSON.parse(deal.stageProgress)
  }));
  res.json(parsedDeals);
});

app.get('/api/deals/:id', async (req, res) => {
  const deal = await prisma.deal.findUnique({
    where: { id: req.params.id }
  });
  if (deal) {
    res.json({
      ...deal,
      stageProgress: JSON.parse(deal.stageProgress)
    });
  } else {
    res.status(404).json({ error: 'Deal not found' });
  }
});

app.post('/api/deals', async (req, res) => {
  const data = req.body;
  const deal = await prisma.deal.create({
    data: {
      ...data,
      stageProgress: JSON.stringify(data.stageProgress || {})
    }
  });
  res.json(deal);
});

app.put('/api/deals/:id', async (req, res) => {
  const data = req.body;
  const deal = await prisma.deal.update({
    where: { id: req.params.id },
    data: {
      ...data,
      stageProgress: data.stageProgress ? JSON.stringify(data.stageProgress) : undefined
    }
  });
  res.json(deal);
});

// Activities
app.get('/api/activities', async (req, res) => {
  const activities = await prisma.activity.findMany({
    orderBy: { timestamp: 'desc' },
    take: 50
  });
  res.json(activities);
});

// Notifications
app.get('/api/notifications', async (req, res) => {
  const notifications = await prisma.notification.findMany({
    orderBy: { timestamp: 'desc' }
  });
  res.json(notifications);
});

// Expenses
app.get('/api/expenses', async (req, res) => {
  const expenses = await prisma.expense.findMany();
  res.json(expenses);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
