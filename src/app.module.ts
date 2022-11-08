import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntegranteController } from './integrante/integrante.controller';
import { IntegranteService } from './integrante/integrante.service';
import { DelegacionController } from './delegacion/delegacion.controller';
import { DelegacionService } from './delegacion/delegacion.service';
import { TorneoController } from './torneo/torneo.controller';
import { TorneoService } from './torneo/torneo.service';
import { MarcaController } from './marca/marca.controller';
import { MarcaService } from './marca/marca.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'client') })
  ],
  controllers: [AppController, IntegranteController, DelegacionController, TorneoController, MarcaController],
  providers: [AppService, IntegranteService, DelegacionService, TorneoService, MarcaService],
})
export class AppModule {}
