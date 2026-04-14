# GenTac ⚽

Official repository for **GenTac: Generative Modeling and Forecasting of Soccer Tactics**.

**Authors:** Jiayuan Rao, Tianlin Gui, Haoning Wu, Yanfeng Wang, Weidi Xie  
**Paper:** [arXiv](https://arxiv.org/abs/2604.11786) | [PDF](https://arxiv.org/pdf/2604.11786) | [Project Page](#)

![GenTac overview](figs/fig1.png)

## TL;DR

**GenTac turns soccer tracking data into playable tactical futures.** Instead of predicting one deterministic continuation, it samples many plausible team-level rollouts, keeps the collective shape of the game intact, and links continuous player movement with interpretable tactical events.

## Overview

Open-play soccer is messy: ten outfield players react to teammates, opponents, space, style, and match objectives at the same time. GenTac models this uncertainty directly. Starting from a short history of player trajectories, it generates long-horizon tactical continuations that can be conditioned on the opponent, team identity, league style, or high-level attacking/defensive intent.

Beyond where players may move next, GenTac also asks what the play is becoming: generated rollouts are grounded into a 15-class tactical event space, enabling tactical event forecasting and counterfactual analysis from the same generative model.

## Highlights

- 🎲 **Many futures, not one guess:** sample diverse long-horizon continuations for open-play soccer.
- 🧩 **Team structure matters:** forecast all players jointly while preserving collective tactical shape.
- 🎛️ **Controllable simulation:** condition generations on opponents, teams, leagues, and tactical objectives.
- 📍 **Movement meets meaning:** connect continuous trajectories with a 15-class tactical event space.
- 🏟️ **TacBench evaluation:** benchmark geometry, structure, style, counterfactual control, and outcome prediction.

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
