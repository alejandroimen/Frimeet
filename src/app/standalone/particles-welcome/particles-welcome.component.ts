import { Component, OnInit } from '@angular/core';
import { Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { NgParticlesService } from "@tsparticles/angular";
import { NgxParticlesModule } from "@tsparticles/angular";

@Component({
  selector: 'app-particles-welcome',
  standalone: true,
  imports: [
    NgxParticlesModule
  ],
  templateUrl: './particles-welcome.component.html',
  styleUrls: ['./particles-welcome.component.css']
})
export class ParticlesWelcomeComponent implements OnInit {
  id = 'tsparticles';
  particlesUrl = "http://foo.bar/particles.json";
  particlesOptions = {
    autoPlay: true,
    background: {
      color: {
        value: '#281006',
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        resize: true,
      },
    },
    particles: {
      color: {
        value: '#ffc700',
      },
      move: {
        enable: true,
        direction: 'none',
        speed: 3,
        outModes: {
          default: 'destroy',
        },
        trail: {
          enable: true,
          length: 20,
          fill: {
            color: {
              value: '#000',
            },
          },
        },
      },
      number: {
        density: {
          enable: true,
          width: 1920,
          height: 1080,
        },
        value: 80,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: 5,
      },
    },
    detectRetina: true,
  };

  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    this.ngParticlesService.init(async (engine: any) => {
      console.log('Particles Engine Loaded');
      await loadSlim(engine);
    });
  }

  particlesLoaded(container: any): void {
    console.log('Particulas cargadas:', container);
  }
}
