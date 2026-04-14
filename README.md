# GenTac ⚽

Official repository for **GenTac: Generative Modeling and Forecasting of Soccer Tactics**.

**Authors:** Jiayuan Rao, Tianlin Gui, Haoning Wu, Yanfeng Wang, Weidi Xie  
**Paper:** [arXiv](https://arxiv.org/abs/2604.11786) | [PDF](https://arxiv.org/pdf/2604.11786) | [Project Page](#)

![GenTac overview](figs/fig1.png)

*Figure 1. GenTac models open-play soccer tactics from tracking histories and contextual conditions, generating multi-player trajectory rollouts and grounding them into tactical events.*

## TL;DR

**GenTac turns soccer tracking data into tactical futures.** It treats open-play soccer as a conditional generative process: given match context, it learns the distribution of how the game may evolve, then samples plausible player movements and tactical events for understanding, simulation, and prediction.

## Overview

Open-play tactics are not a single scripted answer. Players react to teammates, opponents, space, team style, league tendencies, and strategic objectives at the same time. GenTac frames this as learning conditional probability distributions over match evolution: from a short tracking history and optional tactical conditions, the model generates likely futures rather than committing to one deterministic forecast.

This makes GenTac useful for both understanding and prediction. The same framework can extend a possession into multiple realistic continuations, compare how different teams or leagues may play from similar states, and connect continuous movement patterns to discrete tactical outcomes.

## Tasks

### 1. Multi-player Trajectory Forecasting

- **Synchronized rollout:** forecast both teams jointly, preserving team shape and interaction structure.
- **Opponent-conditioned movement:** predict how players adapt their runs and spacing against a given opponent.
- **Team and league style simulation:** generate futures that reflect club-level and league-level tactical tendencies.
- **Objective-guided tactics:** steer rollouts with attacking or defensive guidance for counterfactual analysis.

### 2. Tactical Event Recognition and Forecasting

- **Grounding:** map generated trajectories into a 15-class tactical event space.
- **Forecasting:** anticipate future tactical outcomes directly from generated match rollouts.

## Release Progress

| Item | Status |
| --- | --- |
| Paper | Released |
| Figures | Released |
| Project page | Coming soon |
| Code | Coming soon |
| Data / TacBench | Coming soon |
| Pretrained models | Coming soon |

## Citation

```bibtex
@article{rao2026gentac,
  title={GenTac: Generative Modeling and Forecasting of Soccer Tactics},
  author={Rao, Jiayuan and Gui, Tianlin and Wu, Haoning and Wang, Yanfeng and Xie, Weidi},
  journal={arXiv preprint arXiv:2604.11786},
  year={2026}
}
```
