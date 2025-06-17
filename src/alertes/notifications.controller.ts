import { Controller, Get, Post, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('notifications')
@ApiBearerAuth()
@Controller('notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Get()
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer toutes les notifications de l\'utilisateur' })
    @ApiResponse({ status: 200, description: 'Liste des notifications récupérée avec succès' })
    findAll(@Request() req) {
        return this.notificationsService.findAllByUser(req.user.id);
    }

    @Get('non-lues')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer les notifications non lues de l\'utilisateur' })
    @ApiResponse({ status: 200, description: 'Liste des notifications non lues récupérée avec succès' })
    findUnread(@Request() req) {
        return this.notificationsService.findUnreadByUser(req.user.id);
    }

    @Post(':id/lire')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Marquer une notification comme lue' })
    @ApiResponse({ status: 200, description: 'Notification marquée comme lue avec succès' })
    markAsRead(@Param('id') id: string) {
        return this.notificationsService.markAsRead(+id);
    }

    @Post('tout-lire')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Marquer toutes les notifications comme lues' })
    @ApiResponse({ status: 200, description: 'Toutes les notifications marquées comme lues avec succès' })
    markAllAsRead(@Request() req) {
        return this.notificationsService.markAllAsRead(req.user.id);
    }

    @Delete(':id')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer une notification' })
    @ApiResponse({ status: 200, description: 'Notification supprimée avec succès' })
    remove(@Param('id') id: string) {
        return this.notificationsService.remove(+id);
    }
} 