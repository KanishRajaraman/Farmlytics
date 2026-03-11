#DQN


import torch, random
import torch.nn as nn
import torch.optim as optim
import numpy as np
from collections import deque
import gymnasium as gym

# Environment
env = gym.make("CartPole-v1")
state_size, action_size = env.observation_space.shape[0], env.action_space.n

# DQN Model
class DQN(nn.Module):
    def __init__  (self, s, a):
        super().__init__()
        self.fc = nn.Sequential(nn.Linear(s,64), nn.ReLU(), nn.Linear(64,a))
    def forward(self, x):
        return self.fc(x)

# Initialize model & optimizer
model = DQN(state_size, action_size)
optimizer = optim.Adam(model.parameters(), lr=0.001)
loss_fn = nn.MSELoss()
memory = deque(maxlen=2000)
gamma, eps = 0.95, 1.0

# Training loop
for episode in range(100):
    state, _ = env.reset()
    done = False
    while not done:
        # ε-greedy action
        if random.random() < eps:
            action = env.action_space.sample()
        else:
            with torch.no_grad():
                action = torch.argmax(model(torch.tensor(state).float())).item()
        # Step environment
        next_state, reward, terminated, truncated, _ = env.step(action)
        memory.append((state, action, reward, next_state, terminated))
        state = next_state
        done = terminated or truncated

        # Train
        if len(memory) > 32:
            batch = random.sample(memory, 32)
            s_b, a_b, r_b, s2_b, d_b = zip(*batch)
            s_b, s2_b = torch.tensor(np.array(s_b)).float(), torch.tensor(np.array(s2_b)).float()
            a_b = torch.tensor(a_b, dtype=torch.long)
            r_b = torch.tensor(r_b, dtype=torch.float)
            d_b = torch.tensor(d_b, dtype=torch.float)

            q_vals = model(s_b).gather(1, a_b.unsqueeze(1))
            next_q = torch.max(model(s2_b),1)[0].detach()
            target = r_b + gamma * next_q * (1 - d_b)
            loss = loss_fn(q_vals.squeeze(), target)
            optimizer.zero_grad(); loss.backward(); optimizer.step()

    eps = max(0.1, eps*0.99)

print("✅ Training Complete!")

# Evaluate total reward
state, _ = env.reset()
total_reward = 0
done = False
while not done:
    with torch.no_grad():
        action = torch.argmax(model(torch.tensor(state).float())).item()
    state, reward, terminated, truncated, _ = env.step(action)
    total_reward += reward
    done = terminated or truncated

print("Total reward after training:", total_reward)
env.close()
