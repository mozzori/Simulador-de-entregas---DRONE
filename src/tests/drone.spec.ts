import request from 'supertest';
import app from '../app';

describe('Sistema de Entregas por Drone', () => {
  it('Deve retornar status do drone', async () => {
    const res = await request(app).get('/deliveries/drones/status');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('drone');
    expect(res.body.drone).toHaveProperty('id');
    expect(res.body.drone).toHaveProperty('state');
    expect(res.body.drone).toHaveProperty('lastUpdate');
  });

  it('Deve criar um novo pedido', async () => {
    const res = await request(app).post('/deliveries/pedidos').send({
      x: 5,
      y: 5,
      weight: 2,
      priority: 'alta'
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('mensagem', 'Pedido criado com sucesso');
    expect(res.body).toHaveProperty('pedido');
    expect(res.body.pedido).toHaveProperty('id');
  });

  it('Deve listar os pedidos cadastrados', async () => {
    const res = await request(app).get('/deliveries/entregas/rota');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('pedidos');
    expect(Array.isArray(res.body.pedidos)).toBe(true);
  });

  it('Deve simular uma entrega com sucesso', async () => {
    const res = await request(app).post('/deliveries/simulate').send({
      x: 5,
      y: 5,
      weight: 2,
      priority: 'alta'
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('Mensagem', 'Entrega realizada com sucesso.');
    expect(res.body).toHaveProperty('Simulacao');
    expect(Array.isArray(res.body.Simulacao)).toBe(true);
  });

  it('Deve retornar erro ao simular com peso excedido', async () => {
    const res = await request(app).post('/deliveries/simulate').send({
      x: 5,
      y: 5,
      weight: 10,
      priority: 'baixa'
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Peso excede o limite do drone');
  });

  it('Deve retornar erro ao simular em zona bloqueada', async () => {
    const res = await request(app).post('/deliveries/simulate').send({
      x: 10,
      y: 60,
      weight: 3,
      priority: 'média'
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Área não atendida (zona norte bloqueada)');
  });
});