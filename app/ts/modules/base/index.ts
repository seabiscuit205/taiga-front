/*
 * Copyright (C) 2014-2017 Andrey Antukh <niwi@niwi.nz>
 * Copyright (C) 2014-2017 Jesús Espino Garcia <jespinog@gmail.com>
 * Copyright (C) 2014-2017 David Barragán Merino <bameda@dbarragan.com>
 * Copyright (C) 2014-2017 Alejandro Alonso <alejandro.alonso@kaleidos.net>
 * Copyright (C) 2014-2017 Juan Francisco Alcántara <juanfran.alcantara@kaleidos.net>
 * Copyright (C) 2014-2017 Xavi Julian <xavier.julian@kaleidos.net>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * File: modules/base.coffee
 */

import * as angular from "angular"
import * as bind from "./bind"
import {downgradeInjectable} from "@angular/upgrade/static"

import {ConfigurationService} from "./conf"
import {ContribUserSettingsController, ContribController} from "./contrib"
import {HttpService} from "./http"
import {locationFactory} from "./location"
import {modelProvider} from "./model"
import {NavigationUrlsService, NavigationUrlsDirective} from "./navurls"
import {RepositoryService} from "./repository"
import {StorageService} from "./storage"
import {UrlsService} from "./urls"

let module = angular.module("taigaBase", []);
module.directive("tgBoBind", bind.BindOnceBindDirective);
module.directive("tgBoHtml", bind.BindOnceHtmlDirective);
module.directive("tgBoRef", bind.BindOnceRefDirective);
module.directive("tgBoSrc", bind.BindOnceSrcDirective);
module.directive("tgBoHref", bind.BindOnceHrefDirective);
module.directive("tgBoAlt", bind.BindOnceAltDirective);
module.directive("tgBoTitle", bind.BindOnceTitleDirective);
module.directive("tgBindTitle", bind.BindTitleDirective);
module.directive("tgBindHtml", bind.BindHtmlDirective);
module.service("$tgConfig", downgradeInjectable(ConfigurationService));
module.controller("ContribUserSettingsController", ContribUserSettingsController);
module.controller("ContribController", ContribController);
module.service("$tgHttp", HttpService);
module.factory("$tgLocation", ["$location", "$route", "$rootScope", locationFactory]);
module.factory("$tgModel", ["$q", "$http", "$tgUrls", "$tgStorage", modelProvider]);
module.service("$tgNavUrls", NavigationUrlsService);
module.directive("tgNav", ["$tgNavUrls", "$tgAuth", "$q", "$tgLocation", "lightboxService", NavigationUrlsDirective]);
module.service("$tgRepo", RepositoryService);
module.service("$tgStorage", downgradeInjectable(StorageService));
module.service('$tgUrls', downgradeInjectable(UrlsService));

//############################################################################
//# Main Directive
//############################################################################

let TaigaMainDirective = function($rootscope, $window) {
    let link = ($scope, $el, $attrs) =>
        $window.onresize = () => $rootscope.$broadcast("resize")
    ;

    return {link};
};

module.directive("tgMain", ["$rootScope", "$window", TaigaMainDirective]);

//############################################################################
//# Navigation
//############################################################################

let urls = {
    "home": "/",
    "projects": "/projects",
    "error": "/error",
    "not-found": "/not-found",
    "permission-denied": "/permission-denied",

    "discover": "/discover",
    "discover-search": "/discover/search",

    "login": "/login",
    "forgot-password": "/forgot-password",
    "change-password": "/change-password/:token",
    "change-email": "/change-email/:token",
    "cancel-account": "/cancel-account/:token",
    "register": "/register",
    "invitation": "/invitation/:token",
    "create-project": "/project/new",
    "create-project-scrum": "/project/new/scrum",
    "create-project-kanban": "/project/new/kanban",
    "create-project-duplicate": "/project/new/duplicate",
    "create-project-import": "/project/new/import",
    "create-project-import-platform": "/project/new/import/:platform",

    "profile": "/profile",
    "user-profile": "/profile/:username",

    "blocked-project": "/blocked-project/:project",
    "project": "/project/:project",
    "project-detail-ref": "/project/:project/t/:ref",
    "project-backlog": "/project/:project/backlog",
    "project-taskboard": "/project/:project/taskboard/:sprint",
    "project-kanban": "/project/:project/kanban",
    "project-issues": "/project/:project/issues",
    "project-epics": "/project/:project/epics",
    "project-search": "/project/:project/search",

    "project-epics-detail": "/project/:project/epic/:ref",
    "project-userstories-detail": "/project/:project/us/:ref",
    "project-tasks-detail": "/project/:project/task/:ref",
    "project-issues-detail": "/project/:project/issue/:ref",

    "project-wiki": "/project/:project/wiki",
    "project-wiki-list": "/project/:project/wiki-list",
    "project-wiki-page": "/project/:project/wiki/:slug",

    // Team
    "project-team": "/project/:project/team",

    // Admin
    "project-admin-home": "/project/:project/admin/project-profile/details",
    "project-admin-project-profile-details": "/project/:project/admin/project-profile/details",
    "project-admin-project-profile-default-values": "/project/:project/admin/project-profile/default-values",
    "project-admin-project-profile-modules": "/project/:project/admin/project-profile/modules",
    "project-admin-project-profile-export": "/project/:project/admin/project-profile/export",
    "project-admin-project-profile-reports": "/project/:project/admin/project-profile/reports",

    "project-admin-project-values-status": "/project/:project/admin/project-values/status",
    "project-admin-project-values-points": "/project/:project/admin/project-values/points",
    "project-admin-project-values-priorities": "/project/:project/admin/project-values/priorities",
    "project-admin-project-values-severities": "/project/:project/admin/project-values/severities",
    "project-admin-project-values-types": "/project/:project/admin/project-values/types",
    "project-admin-project-values-custom-fields": "/project/:project/admin/project-values/custom-fields",
    "project-admin-project-values-tags": "/project/:project/admin/project-values/tags",

    "project-admin-memberships": "/project/:project/admin/memberships",
    "project-admin-roles": "/project/:project/admin/roles",
    "project-admin-third-parties-webhooks": "/project/:project/admin/third-parties/webhooks",
    "project-admin-third-parties-github": "/project/:project/admin/third-parties/github",
    "project-admin-third-parties-gitlab": "/project/:project/admin/third-parties/gitlab",
    "project-admin-third-parties-bitbucket": "/project/:project/admin/third-parties/bitbucket",
    "project-admin-third-parties-gogs": "/project/:project/admin/third-parties/gogs",
    "project-admin-contrib": "/project/:project/admin/contrib/:plugin",

    // User settings
    "user-settings-user-profile": "/user-settings/user-profile",
    "user-settings-user-change-password": "/user-settings/user-change-password",
    "user-settings-user-avatar": "/user-settings/user-avatar",
    "user-settings-mail-notifications": "/user-settings/mail-notifications",
    "user-settings-contrib": "/user-settings/contrib/:plugin"

};

let init = function($log, $navurls) {
    $log.debug("Initialize navigation urls");
    return $navurls.update(urls);
};

module.run(["$log", "$tgNavUrls", init]);
