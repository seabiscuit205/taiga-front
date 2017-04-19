/*
 * Copyright (C) 2014-2017 Taiga Agile LLC <taiga@taiga.io>
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
 * File: modules.coffee
 */

import {Injectable} from "@angular/core"
import {RepositoryService} from "../../ts/modules/base/repository"

@Injectable()
export class ModulesResource {
    constructor(private repo: RepositoryService) {}

    list(projectId, module) {
        this.repo.queryOneAttribute("project-modules", projectId, module);
    }
};